"use client";

import { useEffect, useState } from 'react';
import { Bookmark, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toggleBookmark } from '@/lib/bookmarkApi';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// ── Skeleton card ─────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-lg border-2 border-gray-100 bg-white p-6 h-[220px] animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-16 mb-4" />
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
      <div className="h-4 bg-gray-200 rounded w-full mb-1" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
    </div>
  );
}

const RecentlyAdded = () => {
  const [items,      setItems]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [bookmarked, setBookmarked] = useState({}); // { id: true/false }
  const [bmLoading,  setBmLoading]  = useState({}); // { id: true } while toggling

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const endpoints = [
          ['literature',           '/literature'],
          ['literary-term',        '/literary-terms'],
          ['world-literature',     '/world-literature'],
          ['critical-perspective', '/critical-perspectives'],
        ];
        const results = await Promise.all(
          endpoints.map(async ([type, path]) => {
            const res  = await fetch(`${API}${path}/recent?limit=2`);
            const json = await res.json();
            return (json.data || []).map(item => ({
              ...item,
              type,
              href: `${path}/${item.slug}`,
            }));
          })
        );
        if (mounted) setItems(results.flat().slice(0, 8));
      } catch {
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  // ── Toggle bookmark ─────────────────────────────────────────
  async function handleBookmark(e, item) {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem('lp_token');
    if (!token) { alert('Please log in to bookmark items.'); return; }

    const key = item._id || item.slug;
    setBmLoading(prev => ({ ...prev, [key]: true }));

    try {
      const json = await toggleBookmark({
        articleId:   item._id,
        articleType: item.type,
        title:       item.title,
        slug:        item.slug,
        image_url:   item.image_url || '',
        category:    item.category || item.tag || item.region || '',
      });

      if (json?.success) {
        setBookmarked(prev => ({ ...prev, [key]: !prev[key] }));
      }
    } catch {
      // silently fail
    } finally {
      setBmLoading(prev => ({ ...prev, [key]: false }));
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#07294e] mb-8">Recently Added</h2>

        {loading ? (
          // ✅ Skeleton loading — no blank screen
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No content found. Add content from the admin panel.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 items-stretch">
            {items.map((item) => {
              const key          = item._id || item.slug;
              const isBookmarked = !!bookmarked[key];
              const isToggling   = !!bmLoading[key];

              return (
                <Link
                  href={item.href}
                  key={`${item.type}-${key}`}
                  className="relative rounded-lg border-2 border-[#b5d56a] bg-white p-6
                    cursor-pointer transition-all duration-300 hover:shadow-2xl
                    flex flex-col max-h-[240px] overflow-hidden group"
                >
                  {/* Watermark */}
                  <div className="absolute -right-4 bottom-4 opacity-10 pointer-events-none">
                    <Image src="/Logo Icons/Literary Palace SVG Icon-01.svg"
                      alt="" width={220} height={220} className="w-44 h-44 md:w-52 md:h-52" />
                  </div>

                  {/* Left stripe */}
                  <span className="absolute left-0 top-0 bottom-0 w-4 bg-[#b5d56a] rounded-tl-lg rounded-bl-lg" aria-hidden="true" />

                  {/* Content */}
                  <div className="flex-1 flex flex-col pl-6 relative pb-12">
                    <div className="mb-2">
                      <span className="inline-block bg-[#b5d56a] text-[#07294e] text-xs font-semibold rounded-full px-3 py-1">
                        {item.tag || item.category || item.region || 'Insight'}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#07294e] mb-1 line-clamp-2 group-hover:underline">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">by {item.author || 'Literary Palace'}</p>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{item.excerpt}</p>
                  </div>

                  {/* ✅ Working bookmark button */}
                  <button
                    type="button"
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    onClick={(e) => handleBookmark(e, item)}
                    disabled={isToggling}
                    className="absolute right-4 bottom-4 z-20 p-1.5 rounded-md
                      hover:bg-gray-100 transition-colors cursor-pointer
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isToggling ? (
                      <Loader2 className="w-5 h-5 animate-spin text-[#07294e]" />
                    ) : (
                      <Bookmark className={`w-5 h-5 transition-colors ${
                        isBookmarked ? 'fill-[#07294e] text-[#07294e]' : 'text-[#07294e]'
                      }`} />
                    )}
                  </button>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentlyAdded;