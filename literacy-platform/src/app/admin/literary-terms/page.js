"use client";

import { useEffect, useState, useRef } from 'react';
import {
  Search, Plus, Edit2, Trash2, X, Save,
  Filter, BookOpen, Calendar, Hash,
  Bold, Italic, List, ListOrdered,
  Link as LinkIcon, Heading1, Heading2, Quote, Loader2
} from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('admin_token') || '' : '';
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
}

// ── Rich Text Editor ──────────────────────────────────────────
function RichTextEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null);

  const applyFormat = (command, val = null) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
  };

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-300">
        <button type="button" onClick={() => applyFormat('bold')}    className="p-2 hover:bg-gray-200 rounded" title="Bold"><Bold size={18} /></button>
        <button type="button" onClick={() => applyFormat('italic')}  className="p-2 hover:bg-gray-200 rounded" title="Italic"><Italic size={18} /></button>
        <button type="button" onClick={() => applyFormat('underline')}  className="p-2 hover:bg-gray-200 rounded" title="Underline"><span className="font-bold underline text-sm">U</span></button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button type="button" onClick={() => applyFormat('formatBlock', '<h1>')} className="p-2 hover:bg-gray-200 rounded" title="H1"><Heading1 size={18} /></button>
        <button type="button" onClick={() => applyFormat('formatBlock', '<h2>')} className="p-2 hover:bg-gray-200 rounded" title="H2"><Heading2 size={18} /></button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button type="button" onClick={() => applyFormat('insertUnorderedList')} className="p-2 hover:bg-gray-200 rounded" title="Bullet List"><List size={18} /></button>
        <button type="button" onClick={() => applyFormat('insertOrderedList')} className="p-2 hover:bg-gray-200 rounded" title="Numbered List"><ListOrdered size={18} /></button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button type="button" onClick={() => applyFormat('formatBlock', '<blockquote>')} className="p-2 hover:bg-gray-200 rounded" title="Quote"><Quote size={18} /></button>
        <button type="button"
          onClick={() => { const url = prompt('Enter URL:'); if (url) applyFormat('createLink', url); }}
     className="p-2 hover:bg-gray-200 rounded" title="Insert Link">
          <LinkIcon size={18} />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
   className="min-h-[300px] p-4 outline-none prose prose-sm max-w-none"
        style={{ whiteSpace: 'pre-wrap' }}
        suppressContentEditableWarning
      />
      {!value && (
        <div className="absolute top-14 left-4 text-gray-400 pointer-events-none text-sm">
          {placeholder}
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function LiteraryTermsPage() {
  const [terms,       setTerms]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [saving,      setSaving]      = useState(false);
  const [deleting,    setDeleting]    = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal,   setShowModal]   = useState(false);
  const [editingTerm, setEditingTerm] = useState(null);
  const [toast,       setToast]       = useState(null);
  const [formData,    setFormData]    = useState({
    title: '', slug: '', excerpt: '', content: '',
  });

  // ── Fetch all terms from backend ──────────────────────────
  async function loadTerms() {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/literary-terms?limit=200`);
      const json = await res.json();
      setTerms(json.data || []);
    } catch {
      showToast('error', 'Could not load terms. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadTerms(); }, []);

  // ── Toast ─────────────────────────────────────────────────
  function showToast(type, msg) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }

  // ── Filtered list ─────────────────────────────────────────
  const filteredTerms = terms.filter(term =>
    term.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── Open modal ────────────────────────────────────────────
  function openModal(term = null) {
    if (term) {
      setEditingTerm(term);
      setFormData({
        title:   term.title   || '',
        slug:    term.slug    || '',
        excerpt: term.excerpt || '',
        content: term.content?.definition || '',
      });
    } else {
      setEditingTerm(null);
      setFormData({ title: '', slug: '', excerpt: '', content: '' });
    }
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingTerm(null);
    setFormData({ title: '', slug: '', excerpt: '', content: '' });
  }

  // Auto-generate slug from title
  function handleTitleChange(val) {
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: editingTerm
        ? prev.slug
        : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }));
  }

  // ── Submit (create or update) ─────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title:   formData.title,
      slug:    formData.slug,
      excerpt: formData.excerpt,
      content: { definition: formData.content },
    };

    try {
      const isEdit = !!editingTerm;
      const url    = isEdit
        ? `${API}/literary-terms/${editingTerm.slug}`
        : `${API}/literary-terms`;
      const method = isEdit ? 'PUT' : 'POST';

      const res  = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!json.success) throw new Error(json.message || 'Save failed');

      showToast('success', isEdit ? 'Term updated!' : 'Term created!');
      closeModal();
      loadTerms();
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setSaving(false);
    }
  }

  // ── Delete ────────────────────────────────────────────────
  async function handleDelete(term) {
    if (!confirm(`Delete "${term.title}"? This cannot be undone.`)) return;
    setDeleting(term._id);
    try {
      const res  = await fetch(`${API}/literary-terms/${term.slug}`, {
        method:  'DELETE',
        headers: authHeaders(),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Delete failed');
      showToast('success', 'Term deleted.');
      loadTerms();
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="space-y-6">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold text-white transition-all ${
          toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Literary Terms</h1>
          <p className="mt-1 text-sm text-gray-600">Manage and organize your literary terms collection</p>
        </div>
        <button
          onClick={() => openModal()}
     className="inline-flex items-center gap-2 px-4 py-2 bg-[#07294e] text-white rounded-lg hover:bg-[#0a3461] transition-colors cursor-pointer"
        >
          <Plus size={20} /> Add New Term
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-lg"><BookOpen className="text-blue-600" size={24} /></div>
            <div>
              <p className="text-sm text-gray-600">Total Terms</p>
              <p className="text-2xl font-bold text-gray-900">{terms.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 rounded-lg"><Filter className="text-green-600" size={24} /></div>
            <div>
              <p className="text-sm text-gray-600">Filtered Results</p>
              <p className="text-2xl font-bold text-gray-900">{filteredTerms.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg"><Calendar className="text-purple-600" size={24} /></div>
            <div>
              <p className="text-sm text-gray-600">Last Updated</p>
              <p className="text-lg font-bold text-gray-900">
                {terms[0]?.createdAt ? new Date(terms[0].createdAt).toLocaleDateString() : '—'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search literary terms..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07294e] focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Excerpt</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin text-[#07294e]" />
                      Loading from database...
                    </div>
                  </td>
                </tr>
              ) : filteredTerms.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    {searchQuery ? 'No terms found matching your search.' : 'No literary terms yet. Click "Add New Term" to create one.'}
                  </td>
                </tr>
              ) : (
                filteredTerms.map(term => (
                  <tr key={term._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{term.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Hash size={14} />{term.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 line-clamp-2 max-w-md">{term.excerpt}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openModal(term)}
                     className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer" title="Edit">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(term)} disabled={deleting === term._id}
                     className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer disabled:opacity-40" title="Delete">
                          {deleting === term._id
                            ? <Loader2 size={18} className="animate-spin" />
                            : <Trash2 size={18} />
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <h2 className="text-xl font-bold text-gray-900">
                {editingTerm ? 'Edit Literary Term' : 'Add New Literary Term'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => handleTitleChange(e.target.value)}
             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07294e] outline-none"
                  placeholder="e.g., Metaphor"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value })}
             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07294e] outline-none"
                  placeholder="e.g., metaphor"
                />
                <p className="mt-1 text-xs text-gray-500">Auto-generated from title. URL-friendly (lowercase, no spaces).</p>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.excerpt}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07294e] outline-none resize-none"
                  placeholder="Brief description of the term..."
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <RichTextEditor
                  value={formData.content}
                  onChange={val => setFormData({ ...formData, content: val })}
                  placeholder="Write the full definition and explanation here..."
                />
                <p className="mt-1 text-xs text-gray-500">Use the toolbar to format your content.</p>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={closeModal}
             className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
             className="inline-flex items-center gap-2 px-4 py-2 bg-[#07294e] text-white rounded-lg hover:bg-[#0a3461] transition-colors disabled:opacity-50 cursor-pointer">
                  {saving
                    ? <><Loader2 size={16} className="animate-spin" />Saving...</>
                    : <><Save size={16} />{editingTerm ? 'Update Term' : 'Create Term'}</>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}