"use client";

import { useState } from 'react';
import { Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminLoginPage() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: email.trim(), password }),
      });

      const json = await res.json();

      if (!json.success) {
        setError(json.message || 'Invalid credentials');
        setLoading(false);
        return;
      }

      // Must be admin role
      if (json.user?.role !== 'admin') {
        setError('Access denied. Admin credentials only.');
        setLoading(false);
        return;
      }

      // Save token and redirect
      localStorage.setItem('admin_token', json.token);
      window.location.href = '/admin/dashboard';

    } catch {
      setError('Cannot connect to server. Is the backend running on port 5000?');
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#07294e] to-[#0a3d6b] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#b5d56a] rounded-2xl mx-auto flex items-center justify-center mb-3 shadow-xl">
            <span className="text-[#07294e] font-black text-xl">LP</span>
          </div>
          <h1 className="text-white font-bold text-xl">Literary Palace</h1>
          <p className="text-white/50 text-sm">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Top bar */}
          <div className="bg-[#b5d56a] px-6 py-4 flex items-center gap-3">
            <LogIn className="w-5 h-5 text-[#07294e]" />
            <div>
              <p className="font-bold text-[#07294e] text-sm">Admin Sign In</p>
              <p className="text-[#07294e]/60 text-xs">Use credentials from your .env file</p>
            </div>
          </div>

          <div className="p-6 space-y-4">

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter admin email"
             className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#07294e]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter admin password"
               className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-11 text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#07294e]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(p => !p)}
               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPw ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
           className="w-full bg-[#07294e] hover:bg-[#0a3461] text-white font-bold py-3
                  rounded-xl transition-colors disabled:opacity-50
                  flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" />Signing in...</>
                  : <><LogIn className="w-4 h-4" />Sign In</>
                }
              </button>
            </form>

            {/* Info box */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-500">
                Credentials are set in your backend <span className="font-mono font-semibold">.env</span> file:
              </p>
              <p className="text-xs text-gray-400 font-mono mt-1">ADMIN_EMAIL=your_email</p>
              <p className="text-xs text-gray-400 font-mono">ADMIN_PASSWORD=your_password</p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}