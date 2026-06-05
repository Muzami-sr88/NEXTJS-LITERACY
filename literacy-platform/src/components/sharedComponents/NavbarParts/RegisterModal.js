"use client";

import { useState } from 'react';
import Link from 'next/link';
import { X, UserPlus, Eye, EyeOff, Loader2 } from 'lucide-react';
import Field from './Field';
import PasswordStrength from './PasswordStrength';
import { API, saveAuth } from './authStorage';

export default function RegisterModal({ onClose, onSwitchToLogin, onSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (password !== confirm) return setError("Passwords don't match");
    if (password.length < 6) return setError('Password must be at least 6 characters');

    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
      });
      const json = await res.json();

      if (!json.success) {
        setError(json.message || 'Registration failed');
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
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 max-h-[92vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer">
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-[#b5d56a] rounded-xl flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-[#07294e]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#07294e]">Create account</h2>
            <p className="text-xs text-gray-500">Join Literary Palace for free</p>
          </div>
        </div>

        {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Full name" id="r-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Austen" autoFocus />
          <Field label="Email address" id="r-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />

          <div>
            <Field
              label="Password"
              id="r-pw"
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              rightEl={
                <button type="button" onClick={() => setShowPw((p) => !p)} className="cursor-pointer text-gray-400 hover:text-gray-600">
                  {showPw ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              }
            />
            <PasswordStrength password={password} />
          </div>

          <Field label="Confirm password" id="r-confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat your password" />

          <label className="flex items-start gap-2 cursor-pointer text-sm text-gray-600">
            <input type="checkbox" required className="mt-0.5 rounded accent-[#07294e]" />
            <span>
              I agree to the{' '}
              <Link href="/terms-and-conditions" onClick={onClose} className="text-[#07294e] font-semibold hover:underline">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy-policy" onClick={onClose} className="text-[#07294e] font-semibold hover:underline">Privacy Policy</Link>
            </span>
          </label>

          <button type="submit" disabled={loading} className="w-full bg-[#b5d56a] hover:bg-[#a3c05a] text-[#07294e] font-bold py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm mt-1">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Creating account...</> : <><UserPlus className="w-4 h-4" />Create Account</>}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-[#07294e] font-bold hover:underline cursor-pointer">Sign in</button>
        </p>
      </div>
    </div>
  );
}
