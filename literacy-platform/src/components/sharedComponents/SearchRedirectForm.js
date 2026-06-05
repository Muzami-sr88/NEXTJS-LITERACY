'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchRedirectForm({ placeholder, target = '/literature' }) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  function submit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`${target}?search=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={submit} className="relative w-full max-w-6xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
   className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-16 sm:pr-20 text-gray-800 bg-white rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#b5d56a] text-sm sm:text-base placeholder-gray-500 border border-transparent"
      />
      <button
        type="submit"
        aria-label="Search"
   className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 p-2 sm:p-3 rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
      >
        <Search className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </form>
  );
}
