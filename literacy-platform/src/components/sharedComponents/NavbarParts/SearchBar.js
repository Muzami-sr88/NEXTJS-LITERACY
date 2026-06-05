"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Search, Loader2, BookOpen, FileText, Globe2, Lightbulb } from 'lucide-react';
import { API } from './authStorage';

const TYPE_ICONS = {
  Literature: BookOpen,
  'Literary Term': FileText,
  'World Literature': Globe2,
  'Critical Perspective': Lightbulb,
};

export default function SearchBar({ onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const doSearch = useCallback(async (q) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/search?q=${encodeURIComponent(q)}&limit=6`);
      const json = await res.json();
      setResults(json.data || []);
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => doSearch(query), 350);
    return () => clearTimeout(t);
  }, [query, doSearch]);

  function pick(url) {
    router.push(url);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search literature, terms, world lit, perspectives..."
       className="flex-1 text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
          ) : query ? (
            <button onClick={() => { setQuery(''); setResults([]); }} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          ) : null}
        </div>

        {results.length > 0 && (
          <ul className="py-2 max-h-72 overflow-y-auto">
            {results.map((r, i) => {
              const Icon = TYPE_ICONS[r.type] || FileText;
              return (
                <li key={`${r.url || r.title}-${i}`}>
                  <button onClick={() => pick(r.url)} className="w-full text-left px-4 py-3 hover:bg-[#f9fce8] transition-colors flex items-center gap-3 cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-[#07294e] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#b5d56a]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#07294e] truncate">{r.title}</p>
                      <p className="text-xs text-gray-400">{r.type}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {query.length > 1 && results.length === 0 && !loading && (
          <p className="px-4 py-6 text-center text-sm text-gray-400">No results for &ldquo;{query}&rdquo;</p>
        )}

        {!query && <p className="px-4 py-5 text-center text-sm text-gray-400">Start typing to search across all content...</p>}
      </div>
    </div>
  );
}
