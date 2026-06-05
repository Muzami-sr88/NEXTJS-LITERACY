"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, LogOut, User, Shield } from 'lucide-react';

export default function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer text-sm">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${isAdmin ? 'bg-[#07294e]' : 'bg-[#b5d56a]'}`}>
          {isAdmin ? <Shield className="w-3.5 h-3.5" /> : user?.name?.charAt(0) || <User className="w-3.5 h-3.5 text-[#07294e]" />}
        </div>
        <span className="font-medium text-[#07294e] max-w-[100px] truncate hidden sm:block">
          {isAdmin ? 'Admin' : user?.name}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50">
            <p className="text-xs text-gray-400 mb-0.5">Signed in as</p>
            <p className="text-sm font-semibold text-[#07294e] truncate">{user?.email}</p>
            {isAdmin && <span className="inline-block mt-1 bg-[#07294e] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Admin</span>}
          </div>

          <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#07294e] hover:bg-[#f9fce8] transition-colors border-b border-gray-50">
            <User className="w-4 h-4" />
            Dashboard
          </Link>

          {isAdmin && (
            <Link href="/admin/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#07294e] font-semibold hover:bg-[#f9fce8] transition-colors border-b border-gray-50">
              <Shield className="w-4 h-4 text-[#07294e]" />
              Admin Panel
            </Link>
          )}

          <button onClick={() => { onLogout(); setOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
