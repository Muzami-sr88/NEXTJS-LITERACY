"use client";

import { useState } from 'react';
import { X, LogIn, Eye, EyeOff, Loader2 } from 'lucide-react';
import Field from './Field';
import { API, saveAuth } from './authStorage';

export default function LoginModal({ onClose, onSwitchToRegister, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const json = await res.json();

      if (!json.success) {
        setError(json.message || 'Invalid credentials');
        setLoading(false);
        return;
      }

      saveAuth(json.token, json.user);
      onSuccess(json.user);
    } catch {
      setError('Cannot connect to server. Is the backend running?');
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer">
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-[#07294e] rounded-xl flex items-center justify-center">
            <LogIn className="w-5 h-5 text-[#b5d56a]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#07294e]">Welcome back</h2>
            <p className="text-xs text-gray-500">Sign in to your Literary Palace account</p>
          </div>
        </div>

        {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Email address" id="l-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoFocus />

          <Field
            label="Password"
            id="l-pw"
            type={showPw ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            rightEl={
              <button type="button" onClick={() => setShowPw((p) => !p)} className="cursor-pointer text-gray-400 hover:text-gray-600">
                {showPw ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            }
          />

          <button type="submit" disabled={loading} className="w-full bg-[#07294e] hover:bg-[#0a3461] text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm mt-1">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Signing in...</> : <><LogIn className="w-4 h-4" />Sign In</>}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <button onClick={onSwitchToRegister} className="text-[#07294e] font-bold hover:underline cursor-pointer">Sign up free</button>
        </p>
      </div>
    </div>
  );
}
