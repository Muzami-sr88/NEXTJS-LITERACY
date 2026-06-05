"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, Bookmark, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_ORIGIN = API.replace(/\/api\/?$/, '');
function mediaUrl(url) { return url?.startsWith('/uploads') ? `${API_ORIGIN}${url}` : url; }

const FILTERS = ['All', 'History', 'Poetry', 'Authors', 'Novels', 'Dramas/Plays', 'Short Stories', 'Prose/Essays'];
const SUB_FILTERS = ['Title', 'Author'];
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const SORT_OPTIONS = ['All', '#', ...ALPHABET];

// ── Card ──────────────────────────────────────────────────────
function LitCard({ item }) {
  return (
    <Link
      href={`/literature/${item.slug}`}
 className="relative rounded-lg border-2 border-[#b5d56a] bg-white p-6 cursor-pointer
        transition-all duration-300 hover:shadow-2xl flex flex-col max-h-[240px] overflow-hidden group"
    >
      {item.image_url ? (
        <Image
          src={mediaUrl(item.image_url)}
          alt={item.title}
          width={64}
          height={80}
     className="absolute right-3 top-3 w-16 h-20 rounded-md object-cover border border-gray-200 shadow-sm"
          unoptimized
        />
      ) : (
        <div className="absolute -right-4 bottom-4 opacity-10 pointer-events-none">
          <Image
            src="/Logo Icons/Literary Palace SVG Icon-01.svg"
            alt="Literacy"
            width={220}
            height={220}
       className="w-44 h-44 md:w-52 md:h-52"
          />
        </div>
      )}

      {/* Left stripe */}
      <span className="absolute left-0 top-0 bottom-0 w-4 bg-[#b5d56a] rounded-tl-lg rounded-bl-lg" aria-hidden="true" />

      <div className="flex-1 flex flex-col pl-6 relative pb-12">
        <div className="mb-2">
          <span className="inline-block bg-[#b5d56a] text-[#07294e] text-xs font-semibold rounded-full px-3 py-1">
            {item.tag || 'Lit Guide'}
          </span>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-[#07294e] mb-1 line-clamp-2 group-hover:underline">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">by {item.author}</p>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{item.excerpt}</p>
      </div>

      {/* Bookmark */}
      <div
   className="absolute right-4 bottom-4 z-20"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
      >
        <button aria-label="Bookmark" className="p-2 rounded-md hover:bg-gray-100">
          <Bookmark className="w-5 h-5 text-[#07294e]" />
        </button>
      </div>
    </Link>
  );
}

// ── Main component ────────────────────────────────────────────
const LiteratureInsights = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSubFilter, setActiveSubFilter] = useState('Title');
  const [selectedSort, setSelectedSort] = useState('All');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const LIMIT = 100;
  const sortRef = useRef(null);
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get('search') || '';

  // Close sort dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setIsSortOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── Fetch data ──────────────────────────────────────────────
  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ limit: String(LIMIT) });

      if (activeFilter !== 'All') params.set('category', activeFilter);
      if (selectedSort !== 'All') params.set('sort', selectedSort);
      if (searchQuery) params.set('search', searchQuery);

      const res = await fetch(`${API}/literature?${params}`);
      if (!res.ok) throw new Error('Failed to load data');
      const json = await res.json();

      setItems(Array.isArray(json.data) ? json.data : []);
      setTotal(json.total || json.data?.length || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [activeFilter, selectedSort, searchQuery]);

  // Re-fetch whenever filter or sort changes
  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, selectedSort, searchQuery]);

  // ── Group items by first letter (or '#' for digits) ─────────
  const grouped = items.reduce((acc, item) => {
    const first = item.title?.[0]?.toUpperCase() || '#';
    const bucket = /[A-Z]/.test(first) ? first : '#';
    if (!acc[bucket]) acc[bucket] = [];
    acc[bucket].push(item);
    return acc;
  }, {});

  const sortedBuckets = Object.keys(grouped).sort((a, b) => {
    if (a === '#') return -1;
    if (b === '#') return 1;
    return a.localeCompare(b);
  });


  return (
    <section className="py-16 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Request Banner */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#b5d56a] mb-6">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center py-3 md:py-4 gap-3 sm:gap-4">
              <p className="text-[#07294e] text-base md:text-lg font-medium text-center sm:text-left">
                Can&apos;t find the insight you need?
              </p>
              <button className="bg-[#07294e] text-white px-4 py-2 rounded-md text-sm md:text-base font-medium hover:opacity-95 transition cursor-pointer whitespace-nowrap">
                Request for Insight
              </button>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#07294e] mb-4">
            {searchQuery ? `${total} search results for \"${searchQuery}\"` : `${total}+ Literature Insights`}
          </h2>

          {/* Category filter bar */}
          <div className="bg-[#f4f4f4] w-full rounded-md mb-7">
            <div className="overflow-x-auto py-3 px-2" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="flex gap-2 whitespace-nowrap min-w-max">
                {FILTERS.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
               className={`inline-flex items-center text-sm px-3.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${activeFilter === filter
                        ? 'bg-[#b5d56a] text-[#07294e] shadow-inner border-transparent font-semibold'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sub-filters + Sort */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              {SUB_FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveSubFilter(filter)}
             className={`text-sm px-3 py-1.5 rounded-md border cursor-pointer transition-colors ${activeSubFilter === filter
                      ? 'bg-[#b5d56a] text-[#07294e] border-[#9cc35a] font-semibold'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden sm:inline">Sort:</span>
              <div className="relative" ref={sortRef}>
                <button
                  type="button"
                  onClick={() => setIsSortOpen(s => !s)}
                  aria-haspopup="listbox"
                  aria-expanded={isSortOpen}
             className="flex items-center gap-2 justify-center w-20 px-3 py-1.5 bg-white rounded-md
                    text-sm font-medium border border-gray-200 hover:bg-gray-50 shadow-sm transition-colors
                    text-[#191919] cursor-pointer"
                >
                  {selectedSort}
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                </button>

                {isSortOpen && (
                  <ul
                    role="listbox"
               className="absolute right-0 mt-2 w-24 max-h-60 overflow-y-auto bg-white
                      border border-gray-200 rounded-md shadow-lg z-50 text-sm text-[#191919] text-center"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <li
                        key={opt}
                        role="option"
                        aria-selected={selectedSort === opt}
                        onClick={() => { setSelectedSort(opt); setIsSortOpen(false); }}
                   className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${selectedSort === opt ? 'font-semibold bg-gray-50' : ''
                          }`}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Content area ─────────────────────────────── */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-[#07294e]" />
          </div>
        ) : error ? (
          <div className="py-16 text-center text-red-500">
            <p className="font-semibold mb-2">Could not load data</p>
            <p className="text-sm text-gray-500">{error}</p>
            <button
              onClick={() => fetchItems()}
         className="mt-4 px-6 py-2 bg-[#07294e] text-white rounded-lg text-sm hover:bg-[#0a3461]"
            >
              Retry
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            No literature found for this filter.
          </div>
        ) : (
          <>
            {sortedBuckets.map((bucket) => (
              <div key={bucket} className="mb-10">
                {/* Alphabetic header */}
                <div className="bg-[#b5d56a] rounded-lg py-3 px-4 mb-6 w-full flex items-center
                  justify-center text-[#07294e] font-semibold shadow-sm">
                  {bucket}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {grouped[bucket].map((item) => (
                    <LitCard key={item._id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default LiteratureInsights;