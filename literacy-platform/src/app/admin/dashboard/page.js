"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Lightbulb, Globe, Users, FileText, TrendingUp, Clock, Loader2, RefreshCw } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function DashboardPage() {
  const [stats,    setStats]    = useState(null);
  const [recent,   setRecent]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      // Fetch counts from all 4 collections in parallel
      const [litRes, termsRes, worldRes, critRes] = await Promise.all([
        fetch(`${API}/literature?limit=1`),
        fetch(`${API}/literary-terms?limit=1`),
        fetch(`${API}/world-literature?limit=1`),
        fetch(`${API}/critical-perspectives?limit=1`),
      ]);

      const [lit, terms, world, crit] = await Promise.all([
        litRes.json(), termsRes.json(), worldRes.json(), critRes.json(),
      ]);

      setStats({
        literature:           lit.total   || 0,
        literaryTerms:        terms.total || 0,
        worldLiterature:      world.total || 0,
        criticalPerspectives: crit.total  || 0,
      });

      // Recent — get last 5 from each, merge, sort by date
      const [litR, termsR, worldR, critR] = await Promise.all([
        fetch(`${API}/literature/recent?limit=3`).then(r => r.json()),
        fetch(`${API}/literary-terms/recent?limit=3`).then(r => r.json()),
        fetch(`${API}/world-literature/recent?limit=3`).then(r => r.json()),
        fetch(`${API}/critical-perspectives/recent?limit=3`).then(r => r.json()),
      ]);

      const all = [
        ...(litR.data   || []).map(i => ({ ...i, type: 'Literature' })),
        ...(termsR.data || []).map(i => ({ ...i, type: 'Literary Term' })),
        ...(worldR.data || []).map(i => ({ ...i, type: 'World Literature' })),
        ...(critR.data  || []).map(i => ({ ...i, type: 'Critical Perspective' })),
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);

      setRecent(all);
    } catch (err) {
      setError('Cannot connect to backend. Make sure the server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const statCards = [
    { name: 'Literary Terms',        key: 'literaryTerms',        icon: FileText,    color: 'bg-blue-500',   href: '/admin/literary-terms' },
    { name: 'Critical Perspectives', key: 'criticalPerspectives', icon: Lightbulb,   color: 'bg-purple-500', href: '/admin/critical-perspectives' },
    { name: 'Literature',            key: 'literature',           icon: BookOpen,    color: 'bg-green-500',  href: '/admin/literature' },
    { name: 'World Literature',      key: 'worldLiterature',      icon: Globe,       color: 'bg-orange-500', href: '/admin/world-literature' },
  ];

  const quickActions = [
    { name: 'Add Literary Term',        href: '/admin/literary-terms',        color: 'bg-blue-600' },
    { name: 'Add Critical Perspective', href: '/admin/critical-perspectives',  color: 'bg-purple-600' },
    { name: 'Add Literature',           href: '/admin/literature',             color: 'bg-green-600' },
    { name: 'Add World Literature',     href: '/admin/world-literature',       color: 'bg-orange-600' },
  ];

  const typeColors = {
    'Literature':           'bg-green-100 text-green-700',
    'Literary Term':        'bg-blue-100 text-blue-700',
    'World Literature':     'bg-orange-100 text-orange-700',
    'Critical Perspective': 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#07294e]">Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">Literary Palace Admin — live database stats</p>
        </div>
        <button onClick={load} disabled={loading}
     className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 cursor-pointer disabled:opacity-50">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map(card => {
          const Icon = card.icon;
          return (
            <Link key={card.name} href={card.href}
         className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className={`${card.color} p-2.5 rounded-xl`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-gray-400 group-hover:text-[#07294e] transition-colors">View all →</span>
              </div>
              <p className="text-sm text-gray-500 mb-1">{card.name}</p>
              {loading ? (
                <div className="h-8 w-16 bg-gray-100 rounded animate-pulse" />
              ) : (
                <p className="text-3xl font-bold text-[#07294e]">{stats?.[card.key] ?? 0}</p>
              )}
            </Link>
          );
        })}
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#07294e] mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map(action => (
              <Link key={action.name} href={action.href}
           className={`block ${action.color} text-white px-4 py-3 rounded-xl font-semibold text-sm text-center hover:opacity-90 transition-opacity`}>
                + {action.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-[#07294e] mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" /> Recently Added
          </h2>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 animate-pulse flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
                    <div className="h-2.5 bg-gray-100 rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : recent.length === 0 ? (
            <p className="text-gray-400 text-sm">No content yet. Add some using Quick Actions.</p>
          ) : (
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {recent.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0">
                  <div className="bg-[#b5d56a] p-2 rounded-lg flex-shrink-0">
                    <FileText className="w-3.5 h-3.5 text-[#07294e]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColors[item.type] || 'bg-gray-100 text-gray-600'}`}>
                        {item.type}
                      </span>
                      <span className="text-xs text-gray-400">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-[#07294e] to-[#0a3d6b] rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">All systems connected</h2>
        <p className="text-blue-100 text-sm mb-4">
          This dashboard reads live data from your MongoDB database. Every add, edit, or delete reflects immediately across the public site.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/literary-terms"
       className="bg-[#b5d56a] text-[#07294e] px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
            Manage Content
          </Link>
          <Link href="/" target="_blank"   rel="noopener noreferrer"
       className="bg-white/10 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-white/20 transition-colors">
            View Live Site →
          </Link>
        </div>
      </div>
    </div>
  );
}
