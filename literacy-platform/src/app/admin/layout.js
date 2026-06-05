"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, BookOpen, Lightbulb, Globe,
  Users, Mail, Settings,
  Menu, X, LogOut, FileText,
} from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Login page — skip auth check entirely
    if (pathname === '/admin/login') {
      setReady(true);
      return;
    }

    const token = localStorage.getItem('admin_token');

    if (!token) {
      router.replace('/admin/login');
      return;
    }

    // Verify token with backend
    fetch(`${API}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(json => {
        if (json.success) {
          setAuthed(true);
          setAdminEmail(json.user?.email || '');
          setReady(true);
        } else {
          // Token invalid or expired — go back to login
          localStorage.removeItem('admin_token');
          router.replace('/admin/login');
        }
      })
      .catch(() => {
        // Server unreachable — still allow if token exists (offline mode)
        setAuthed(true);
        setReady(true);
      });
  }, [pathname]);

  function handleLogout() {
    localStorage.removeItem('admin_token');
    router.replace('/admin/login');
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Literary Terms', href: '/admin/literary-terms', icon: FileText },
    { name: 'Critical Perspectives', href: '/admin/critical-perspectives', icon: Lightbulb },
    { name: 'Literature', href: '/admin/literature', icon: BookOpen },
    { name: 'World Literature', href: '/admin/world-literature', icon: Globe },
    { name: 'Authors', href: '/admin/authors', icon: Users },
    { name: 'Newsletter', href: '/admin/newsletter', icon: Mail },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  // ----- RENDER -----

  // Login page — no sidebar, just render the page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Still checking auth
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#07294e] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-3 text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!authed) return null;

  const currentPage = navItems.find(i => pathname.startsWith(i.href))?.name || 'Admin';

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Backdrop */}
      {sidebarOpen && (
        <div
     className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ────────────────────────────────────── */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-[#07294e] text-white
        flex flex-col
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#0a3d6b]">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5" onClick={() => setSidebarOpen(false)}>
            <div className="w-8 h-8 bg-[#b5d56a] rounded-lg flex items-center justify-center">
              <span className="text-[#07294e] font-black text-sm">LP</span>
            </div>
            <span className="font-bold text-base">Admin Panel</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/50 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin info */}
        {adminEmail && (
          <div className="px-5 py-3 border-b border-[#0a3d6b] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#b5d56a] flex items-center justify-center text-[#07294e] font-bold text-sm flex-shrink-0">
              {adminEmail.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-white/40 leading-none mb-0.5">Logged in</p>
              <p className="text-sm font-medium truncate">{adminEmail}</p>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map(({ name, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
           className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                  transition-all duration-150
                  ${active
                    ? 'bg-[#b5d56a] text-[#07294e] font-bold shadow-sm'
                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {name}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-[#0a3d6b]">
          <button
            onClick={handleLogout}
       className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
              text-white/60 hover:bg-red-500/20 hover:text-red-300
              transition-colors text-sm cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main ───────────────────────────────────────── */}
      <div className="lg:ml-64 min-h-screen flex flex-col">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
           className="lg:hidden text-gray-500 hover:text-[#07294e] cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
              <span className="font-bold text-[#07294e] text-sm">{currentPage}</span>
            </div>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
         className="text-xs text-gray-400 hover:text-[#07294e] transition-colors"
            >
              View Site →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}