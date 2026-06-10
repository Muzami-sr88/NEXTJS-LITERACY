"use client";

import { useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function authHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

const AdminForm = ({ onCreated }) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      title: title.trim(),
      slug: slug.trim() || title.trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''),
      excerpt: excerpt.trim(),
      category: 'General',
      content,
    };

    try {
      const res = await fetch(`${API}/literary-terms`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Failed to create term');
      setMessage({ type: 'success', text: 'Term created successfully' });
      setTitle(''); setSlug(''); setExcerpt(''); setContent('');
      onCreated?.();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to create term' });
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
      
      {/* Message Alert */}
      {message && (
        <div className={`p-4 rounded-lg border-l-4 ${message.type === 'success' ? 'bg-green-50 border-green-400 text-green-800' : 'bg-red-50 border-red-400 text-red-800'}`}>
          {message.text}
        </div>
      )}

      {/* Title Field */}
      <div className="space-y-1">
        <label className="block text-sm font-semibold text-[#07294e]">
          Title <span className="text-red-500">*</span>
        </label>
        <input 
          required 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter the term title (e.g., Metaphor, Alliteration)"
          className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-[#07294e] focus:ring-1 focus:ring-[#07294e] transition"
        />
      </div>

      {/* Slug Field */}
      <div className="space-y-1">
        <label className="block text-sm font-semibold text-[#07294e]">
          Slug <span className="text-gray-400 text-xs">(optional)</span>
        </label>
        <input 
          value={slug} 
          onChange={(e) => setSlug(e.target.value)} 
          placeholder="Leave blank to auto-generate from title"
          className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-[#07294e] focus:ring-1 focus:ring-[#07294e] transition"
        />
      </div>

      {/* Excerpt Field */}
      <div className="space-y-1">
        <label className="block text-sm font-semibold text-[#07294e]">
          Excerpt
        </label>
        <textarea 
          value={excerpt} 
          onChange={(e) => setExcerpt(e.target.value)} 
          placeholder="Write a short summary or introduction for this term"
          className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-[#07294e] focus:ring-1 focus:ring-[#07294e] transition"
          rows={3}
        />
      </div>

      {/* Content Field */}
      <div className="space-y-1">
        <label className="block text-sm font-semibold text-[#07294e]">
          Definition / Content <span className="text-red-500">*</span>
        </label>
        <textarea 
          required
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Provide a detailed definition, explanation, or full content for this literary term"
          className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-[#07294e] focus:ring-1 focus:ring-[#07294e] transition"
          rows={8}
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="w-full bg-[#07294e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#051f38] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </span>
        ) : 'Create Term'}
      </button>
    </form>
  );
};

export default AdminForm;
