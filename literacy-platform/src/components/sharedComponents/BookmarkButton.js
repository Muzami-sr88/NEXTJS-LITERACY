"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { toggleBookmark } from "@/lib/bookmarkApi";
import { useActionToast } from "@/components/sharedComponents/ActionToast";

export default function BookmarkButton({ item, articleType, className = "" }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { Toast, showToast } = useActionToast();

  async function handleClick() {
    const token = typeof window !== "undefined" ? localStorage.getItem("lp_token") : "";
    if (!token) return showToast("error", "Please login first");
    if (!item?._id && !item?.id) return showToast("error", "This article is not available to bookmark yet");

    try {
      setLoading(true);
      const result = await toggleBookmark({
        articleId: item._id || item.id,
        articleType,
        title: item.title,
        slug: item.slug,
        category: item.category || item.region || item.tag || "",
      });

      if (!result.success) throw new Error(result.message || "Bookmark failed");
      setBookmarked(result.bookmarked);
      showToast("success", result.bookmarked ? "Article saved" : "Article removed");
    } catch (error) {
      showToast("error", error.message || "Bookmark failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {Toast}
      <button
      type="button"
      aria-label={bookmarked ? "Remove bookmark" : "Bookmark article"}
      disabled={loading}
      onClick={handleClick}
 className={`inline-flex items-center justify-center rounded-full bg-white p-2 shadow hover:bg-[#f9fce8] disabled:opacity-60 ${className}`}
    >
      <Bookmark className={`w-5 h-5 text-[#07294e] ${bookmarked ? "fill-current" : ""}`} />
      </button>
    </>
  );
}
