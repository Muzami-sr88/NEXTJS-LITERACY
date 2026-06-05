"use client";

import { useEffect, useMemo, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Loader2 } from 'lucide-react';
import { toggleBookmark } from '@/lib/bookmarkApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionToast } from '@/components/sharedComponents/ActionToast';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const CATEGORIES = ['All', '#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
const LIMIT = 100;

export default function RecentlyAddedLiteraryTerms() {
  const { Toast, showToast } = useActionToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const searchQuery = searchParams?.get('search') || '';

  const loadTerms = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ limit: String(LIMIT) });
      if (searchQuery) params.set('search', searchQuery);
      if (selectedCategory !== 'All') params.set('sort', selectedCategory);
      const res = await fetch(`${API}/literary-terms?${params}`);
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Failed to fetch literary terms');
      const incoming = Array.isArray(json.data) ? json.data : [];
      setItems(incoming);
      setTotal(json.total || incoming.length || 0);
    } catch (err) {
      setError(err.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const q = searchParams?.get('category');
    if (q) setSelectedCategory(q);
  }, [searchParams]);

  useEffect(() => { loadTerms(); }, [loadTerms]);

  function handleSelectCategory(char) {
    setSelectedCategory(char);
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (char && char !== 'All') params.set('category', char);
    else params.delete('category');
    router.replace(`/literary-terms${params.toString() ? `?${params}` : ''}`);
  }

  const grouped = useMemo(() => items.reduce((acc, item) => {
    const first = (item.title || '').charAt(0).toUpperCase();
    const bucket = /[A-Z]/.test(first) ? first : '#';
    (acc[bucket] ||= []).push(item);
    return acc;
  }, {}), [items]);

  const buckets = Object.keys(grouped).sort((a, b) => a === '#' ? -1 : b === '#' ? 1 : a.localeCompare(b));

  async function handleBookmark(item) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('lp_token') : '';
    if (!token) return showToast('error', 'Please login first');

    const result = await toggleBookmark({
      articleId: item._id || item.id,
      articleType: 'literary-term',
      title: item.title,
      slug: item.slug,
      image_url: item.image_url || '',
      category: item.category || item.tag || '',
    });

    showToast(result.success ? 'success' : 'error', result.success ? (result.bookmarked ? 'Article saved' : 'Article removed') : (result.message || 'Bookmark failed'));
  }

  return (
    <>
      {Toast}
      <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#07294e] mb-2">
            {searchQuery ? `${total} search results for "${searchQuery}"` : `${total}+ Literary Terms`}
          </h2>
          <p className="text-sm text-gray-600">Browse terms alphabetically or search directly from the hero bar.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {CATEGORIES.map((char) => (
            <button
              key={char}
              onClick={() => handleSelectCategory(char)}
         className={`px-3 py-1.5 rounded-md text-sm font-medium border border-gray-200 hover:bg-gray-50 shadow-sm transition-colors text-[#191919] cursor-pointer ${selectedCategory === char ? 'bg-[#b5d56a] text-[#07294e] font-bold' : 'bg-white'}`}
            >
              {char}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start">
          <div className="w-full lg:col-span-9">
            {loading ? (
              <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#07294e]" /></div>
            ) : error ? (
              <div className="text-center text-red-500 py-16">{error}</div>
            ) : items.length === 0 ? (
              <div className="text-center text-gray-600 py-16">No insights available for this search/filter.</div>
            ) : (
              <>
                {buckets.map((category) => (
                  <div key={category} className="mb-8">
                    <div className="bg-[#b5d56a] rounded-lg py-3 px-4 mb-6 w-full flex items-center justify-center text-[#07294e] font-semibold shadow-sm">{category}</div>
                    <div className="grid grid-cols-1 gap-6">
                      {grouped[category].map((item) => (
                        <Link
                          key={item._id || item.slug}
                          href={`/literary-terms/${item.slug}${selectedCategory && selectedCategory !== 'All' ? `?category=${selectedCategory}` : ''}`}
                     className="relative rounded-lg border-2 border-[#b5d56a] bg-white p-4 hover:shadow-lg transition-shadow"
                        >
                          <div className="absolute right-5 bottom-1 opacity-10 pointer-events-none">
                            <Image src="/Logo Icons/Literary Palace SVG Icon-01.svg" alt="Literacy" width={120} height={120} className="w-32 h-32" />
                          </div>
                          <span className="absolute left-0 top-0 bottom-0 w-4 bg-[#b5d56a] rounded-tl-lg rounded-bl-lg" aria-hidden="true" />
                          <div className="flex-1 flex flex-col pl-6 relative pb-10">
                            <h3 className="text-base md:text-lg font-bold text-[#07294e] mb-1 line-clamp-2">{item.title}</h3>
                            <p className="text-sm text-[#07294e] mb-1">A Gateway to the world of Literature</p>
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{item.excerpt}</p>
                            <span className="text-[#07294e] text-sm font-medium hover:underline mt-1">Read More</span>
                          </div>
                          <button
                            type="button"
                            aria-label="Bookmark literary term"
                       className="absolute right-4 bottom-4 z-20 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleBookmark(item); }}
                          >
                            <Bookmark className="w-5 h-5 text-[#07294e]" />
                          </button>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <aside className="w-full lg:col-span-3">
            <div className="relative bg-[#f4f4f4] border-2 border-[#b5d56a] p-6 min-h-[320px] rounded-lg">
              <h3 className="text-xl md:text-2xl mt-4 font-bold text-[#07294e] text-center">Upgrade to</h3>
              <div className="flex items-center justify-center mb-3">
                <div className="relative inline-block">
                  <Image src="/Logo Icons/Literary Palace SVG-01.svg" alt="Literary Palace" width={250} height={60} style={{ width: 'auto', height: '48px' }} className="object-contain" />
                  <span className="absolute top-2 right-4 text-[11px] font-merriweather text-[#07294e] uppercase">PLUS</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2 text-center">Download clear Literary Terms PDFs, definitions, examples, and analysis for quick study.</p>
              <Image src="/A+ Icon-01.svg" alt="A+" width={56} height={56} className="absolute top-2 right-1 w-11 h-11 z-30" />
              <div className="flex items-center justify-center mb-6">
                <Image src="/UpgradeToLP-01.svg" alt="Upgrade illustration" width={170} height={170} className="w-44 h-auto object-contain" />
              </div>
              <div className="text-center"><button className="bg-[#07294e] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0a3a6b] transition-colors cursor-pointer">Download</button></div>
            </div>
            <div className="mt-4 bg-[#b5d56a] py-7 px-6 w-full flex flex-col items-center justify-center text-[#07294e] shadow-sm rounded-lg">
              <p className="text-sm font-medium mb-5">Can&apos;t find the insight you need?</p>
              <button className="bg-[#07294e] text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-95 transition cursor-pointer">Request for Insight</button>
            </div>
          </aside>
        </div>
      </div>
      </section>
    </>
  );
}