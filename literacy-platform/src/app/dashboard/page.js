"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Loader2 } from "lucide-react";
import { getMyBookmarks, toggleBookmark } from "@/lib/bookmarkApi";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [toast, setToast] = useState(null);
  const router = useRouter();

  const showToast = (type, message) => {
    setToast({ type, message });
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(null), 2500);
  };

  const getArticleUrl = (item) => {
    switch (item.articleType) {
      case "literature":
        return `/literature/${item.slug}`;

      case "literary-term":
        return `/literary-terms/${item.slug}`;

      case "world-literature":
        return `/world-literature/${item.slug}`;

      case "critical-perspective":
        return `/critical-perspectives/${item.slug}`;

      default:
        return "/";
    }
  };

  async function loadBookmarks() {
    try {
      const data = await getMyBookmarks();

      if (Array.isArray(data)) {
        setBookmarks(data);
      } else if (Array.isArray(data.bookmarks)) {
        setBookmarks(data.bookmarks);
      } else if (Array.isArray(data.data)) {
        setBookmarks(data.data);
      } else {
        setBookmarks([]);
      }
    } catch {
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookmarks();

    return () => {
      window.clearTimeout(showToast.timer);
    };
  }, []);

  const handleRemoveBookmark = async (event, item) => {
    event.preventDefault();
    event.stopPropagation();

    const bookmarkKey = item._id || item.articleId || item.slug;
    setRemovingId(bookmarkKey);

    try {
      const result = await toggleBookmark({
        articleId: item.articleId || item._id || item.id,
        articleType: item.articleType,
        title: item.title,
        slug: item.slug,
        category: item.category,
      });

      if (result.success) {
        // Remove instantly from UI after successful toggle.
        setBookmarks((prev) =>
          prev.filter(
            (bookmark) =>
              (bookmark._id || bookmark.articleId || bookmark.slug) !== bookmarkKey
          )
        );

        showToast("success", "Bookmark removed");
      } else {
        showToast("error", result.message || "Could not remove bookmark");
      }
    } catch {
      showToast("error", "Could not remove bookmark. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        Loading saved articles...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {toast && (
        <div
          className={`fixed right-5 top-24 z-[9999] rounded-xl px-4 py-3 text-sm font-semibold shadow-xl ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#07294e] text-white hover:bg-[#0a3a6b] transition-all duration-200 shadow-md"
        >
          ← Back
        </button>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-[#07294e] mb-2">
          My Dashboard
        </h1>

        <p className="text-gray-500">
          All your bookmarked articles in one place.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <p className="text-gray-500">No saved articles yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {bookmarks.map((item) => {
            const bookmarkKey = item._id || item.articleId || item.slug;
            const isRemoving = removingId === bookmarkKey;

            return (
              <Link
                key={bookmarkKey}
                href={getArticleUrl(item)}
                className="group relative overflow-hidden rounded-2xl border-2 border-[#b5d56a] bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Remove Button */}
                <button
                  type="button"
                  aria-label={`Remove ${item.title} from bookmarks`}
                  disabled={isRemoving}
                  onClick={(event) => handleRemoveBookmark(event, item)}
                  className="absolute right-4 top-4 z-30 rounded-full bg-red-50 p-2 text-red-600 shadow-sm transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isRemoving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>

                {/* Left Accent */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#b5d56a]" />

                {/* Background Logo */}
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                  <Image
                    src="/Logo Icons/Literary Palace SVG Icon-01.svg"
                    alt=""
                    width={128}
                    height={128}
                    className="w-32 h-32 object-contain"
                  />
                </div>

                <div className="p-5 pl-7 pr-14 relative z-10">
                  <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold bg-[#b5d56a] text-[#07294e]">
                    {item.articleType}
                  </span>

                  <h3 className="text-xl font-bold text-[#07294e] group-hover:text-[#0a3a6b] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {item.category || item.articleType}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      Saved Article
                    </span>

                    <div className="px-3 py-1 rounded-full text-xs font-bold bg-[#07294e] text-white">
                      View →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
