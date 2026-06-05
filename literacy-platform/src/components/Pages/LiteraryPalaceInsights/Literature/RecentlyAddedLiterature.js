"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Loader2 } from 'lucide-react';
import { toggleBookmark } from '@/lib/bookmarkApi';
import { useActionToast } from '@/components/sharedComponents/ActionToast';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const LIMIT = 6;

export default function RecentlyAddedLiterature() {
  const { Toast, showToast } = useActionToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let mounted = true;

    async function loadRecent() {
      setLoading(true);
      try {
        const res = await fetch(`${API}/literature/recent?limit=${LIMIT}`);
        const json = await res.json();
        if (mounted) setItems(Array.isArray(json.data) ? json.data : []);
      } catch {
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadRecent();
    return () => { mounted = false; };
  }, []);

  async function handleBookmark(item) {
    const token = localStorage.getItem('lp_token');
    if (!token) return showToast('error', 'Please login first');
    const result = await toggleBookmark({
      articleId: item._id || item.id,
      articleType: 'literature',
      title: item.title,
      slug: item.slug,
      image_url: item.image_url,
      category: item.category,
    });
    showToast(result.success ? 'success' : 'error', result.success ? (result.bookmarked ? 'Article saved' : 'Article removed') : (result.message || 'Bookmark failed'));
  }

  return (
    <>
      {Toast}
      <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#07294e] mb-10">Recently Added</h2>
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start">
          <div className="w-full lg:col-span-9">
            {loading ? <div className="flex items-center justify-center py-16"><Loader2 className="w-7 h-7 animate-spin text-[#07294e]" /></div> : error ? <p className="text-red-500 text-sm py-8">{error}</p> : <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {items.map((item) => (
                  <Link key={item._id || item.slug} href={`/literature/${item.slug}`} className="relative rounded-lg border-2 border-[#b5d56a] bg-white p-4 cursor-pointer transition-all duration-300 hover:shadow-2xl flex flex-col overflow-hidden min-h-[200px] group">
                    <div className="absolute -right-4 bottom-4 opacity-10 pointer-events-none"><Image src="/Logo Icons/Literary Palace SVG-01.svg" alt="" width={250} height={60} style={{ width: 'auto', height: '48px' }} className="object-contain" /></div>
                    <span className="absolute left-0 top-0 bottom-0 w-4 bg-[#b5d56a] rounded-tl-lg rounded-bl-lg" aria-hidden="true" />
                    <div className="flex-1 flex flex-col pl-6 relative pb-10">
                      <div className="mb-2"><span className="inline-block bg-[#b5d56a] text-[#07294e] text-xs font-semibold rounded-full px-3 py-1">{item.tag || 'Lit Guide'}</span></div>
                      <h3 className="text-base md:text-lg font-bold text-[#07294e] mb-1 line-clamp-2 group-hover:underline">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {item.author}</p>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{item.excerpt}</p>
                    </div>
                    <button type="button" aria-label="Bookmark literature" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleBookmark(item); }} className="absolute right-4 bottom-4 z-20 bg-white p-2 rounded-full shadow hover:bg-[#f9fce8]"><Bookmark size={20} className="text-[#07294e]" /></button>
                  </Link>
                ))}
              </div>
            </>}
          </div>
          <div className="w-full lg:col-span-3"><div className="relative bg-[#f4f4f4] border-2 border-[#b5d56a] p-6 flex flex-col justify-between min-h-[320px] rounded-lg"><h3 className="text-xl md:text-2xl mt-4 font-bold text-[#07294e] text-center">Upgrade to Literary Palace PLUS</h3><p className="text-sm text-gray-600 my-5 text-center">Download clear Literature insights PDFs, summaries, themes, characters, quotes, and analysis for quick study.</p><div className="text-center"><button className="bg-[#07294e] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0a3a6b] transition-colors cursor-pointer">Download</button></div></div></div>
        </div>
      </div>
      </section>
    </>
  );
}