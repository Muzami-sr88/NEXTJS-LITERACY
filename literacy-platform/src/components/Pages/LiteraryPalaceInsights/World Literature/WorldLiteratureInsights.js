"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, Bookmark, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_ORIGIN = API.replace(/\/api\/?$/, '');
function mediaUrl(url) { return url?.startsWith('/uploads') ? `${API_ORIGIN}${url}` : url; }
const FILTERS = ['All'];
const SORT_OPTIONS = ['All', '#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
const LIMIT = 100;

export default function WorldLiteratureInsights() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedSort, setSelectedSort] = useState('All');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sortRef = useRef(null);
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get('search') || '';

  useEffect(() => {
    const handler = (e) => { if (sortRef.current && !sortRef.current.contains(e.target)) setIsSortOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: String(LIMIT) });
      if (activeFilter !== 'All') params.set('category', activeFilter);
      if (selectedSort !== 'All') params.set('sort', selectedSort);
      if (searchQuery) params.set('search', searchQuery);
      const res = await fetch(`${API}/world-literature?${params}`);
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Failed to load data');
      const incoming = Array.isArray(json.data) ? json.data : [];
      setItems(incoming);
      setTotal(json.total || incoming.length || 0);
    } catch (err) {
      setError(err.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [activeFilter, selectedSort, searchQuery]);

  useEffect(() => { load(); }, [load]);

  const grouped = items.reduce((acc, item) => {
    const first = item.title?.[0]?.toUpperCase() || '#';
    const bucket = /[A-Z]/.test(first) ? first : '#';
    (acc[bucket] ||= []).push(item);
    return acc;
  }, {});
  const buckets = Object.keys(grouped).sort((a, b) => a === '#' ? -1 : b === '#' ? 1 : a.localeCompare(b));

  return (
    <section className="py-16 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-screen relative left-1/2 -translate-x-1/2 bg-[#b5d56a] mb-8">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center py-3 gap-3 sm:gap-4">
              <p className="text-[#07294e] text-base md:text-lg font-medium text-center sm:text-left">Can&apos;t find the insight you need?</p>
              <button type="button" className="bg-[#07294e] text-white px-4 py-2 rounded-md text-sm md:text-base font-medium hover:opacity-90 transition cursor-pointer whitespace-nowrap">Request for Insight</button>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-[#07294e] mb-5">
          {searchQuery ? `${total} search results for "${searchQuery}"` : `${total}+ World Literature Insights`}
        </h2>

        <div className="bg-[#f4f4f4] w-full rounded-md mb-7">
          <div className="flex items-center justify-between gap-3 px-3 sm:px-4 py-3 flex-wrap">
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map((filter) => (
                <button key={filter} onClick={() => setActiveFilter(filter)} className={`text-sm px-3.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${activeFilter === filter ? 'bg-[#b5d56a] text-[#07294e] border-transparent font-semibold shadow-inner' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>{filter}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-sm text-gray-600 hidden sm:inline">Sort:</span>
              <div className="relative" ref={sortRef}>
                <button type="button" onClick={() => setIsSortOpen(s => !s)} className="flex items-center gap-2 w-20 px-3 py-1.5 bg-white rounded-md text-sm font-medium border border-gray-200 hover:bg-gray-50 shadow-sm transition-colors text-[#191919] cursor-pointer">{selectedSort}<ChevronDown className="w-4 h-4" /></button>
                {isSortOpen && <ul className="absolute right-0 mt-2 w-20 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-50 text-sm text-center">{SORT_OPTIONS.map(opt => <li key={opt} onClick={() => { setSelectedSort(opt); setIsSortOpen(false); }} className={`px-3 py-2 hover:bg-gray-100 cursor-pointer text-[#191919] ${selectedSort === opt ? 'font-semibold bg-gray-50' : ''}`}>{opt}</li>)}</ul>}
              </div>
            </div>
          </div>
        </div>

        {loading ? <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-[#07294e]" /></div> : error ? <div className="py-16 text-center text-red-500">{error}</div> : items.length === 0 ? <div className="py-16 text-center text-gray-500">No backend content found.</div> : <>
          {buckets.map(bucket => (
            <div key={bucket}>
              <div className="bg-[#b5d56a] rounded-lg py-3 px-4 mb-6 w-full flex items-center justify-center text-[#07294e] font-semibold shadow-sm tracking-widest">{bucket}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {grouped[bucket].map(item => (
                  <Link href={`/world-literature/${item.slug}`} key={item._id || item.slug} className="relative rounded-lg border-2 border-[#b5d56a] bg-white p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl flex flex-col max-h-[240px] overflow-hidden group">
                    {item.image_url ? <Image src={mediaUrl(item.image_url)} alt={item.title} width={64} height={80} unoptimized className="absolute right-3 top-3 w-16 h-20 rounded-md object-cover border border-gray-200 shadow-sm" /> : <div className="absolute -right-4 bottom-4 opacity-10 pointer-events-none"><Image src="/Logo Icons/Literary Palace SVG Icon-01.svg" alt="" width={220} height={220} className="w-44 h-44 md:w-52 md:h-52" /></div>}
                    <span className="absolute left-0 top-0 bottom-0 w-4 bg-[#b5d56a] rounded-tl-sm rounded-bl-sm" />
                    <div className="flex-1 flex flex-col pl-6 relative pb-12">
                      <div className="mb-2"><span className="inline-block bg-[#b5d56a] text-[#07294e] text-xs font-semibold rounded-full px-3 py-1">{item.tag || item.category || item.region || 'Guide'}</span></div>
                      <h3 className="text-base md:text-lg font-bold text-[#07294e] mb-1 line-clamp-2 group-hover:underline">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {item.author || 'Literary Palace'}</p>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{item.excerpt}</p>
                    </div>
                    <div className="absolute right-4 bottom-4 z-20"><Bookmark className="w-5 h-5 text-[#07294e]" /></div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </>}
      </div>
    </section>
  );
}
