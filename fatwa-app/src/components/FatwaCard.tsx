"use client";

import Link from "next/link";
import { Bookmark, BookmarkCheck, Share2 } from "lucide-react";
import { useFatwaContext } from "@/providers/FatwaProvider";
import type { Fatwa } from "@/types/fatwa";
import { useCallback, useMemo } from "react";

export const FatwaCard = ({ fatwa }: { fatwa: Fatwa }) => {
  const { favorites, toggleFavorite } = useFatwaContext();
  const isFavorite = favorites.includes(fatwa.id);

  const formattedDate = useMemo(
    () =>
      new Date(fatwa.createdAt).toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [fatwa.createdAt]
  );

  const handleShare = useCallback(async () => {
    const shareData = {
      title: fatwa.title,
      text: fatwa.content.slice(0, 120),
      url: `${window.location.origin}/fatwas/${fatwa.id}`,
    };

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareData.url);
      alert("تم نسخ رابط الفتوى إلى الحافظة.");
    }
  }, [fatwa]);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-emerald-50 bg-white p-6 text-emerald-900 shadow-sm shadow-emerald-50 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            {fatwa.category}
          </span>
          <h3 className="mt-3 text-lg font-semibold leading-7 text-[#0b7a45]">
            {fatwa.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-emerald-700">
            {fatwa.content}
          </p>
        </div>
        <button
          type="button"
          onClick={() => toggleFavorite(fatwa.id)}
          className="rounded-2xl border border-transparent bg-emerald-50 p-2 text-emerald-600 transition hover:border-emerald-200 hover:bg-emerald-100"
          aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
        >
          {isFavorite ? (
            <BookmarkCheck className="size-5" />
          ) : (
            <Bookmark className="size-5" />
          )}
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-emerald-500">
        <time dateTime={fatwa.createdAt}>{formattedDate}</time>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 rounded-xl border border-emerald-100 px-3 py-1 transition hover:border-emerald-200 hover:bg-emerald-50"
          >
            <Share2 className="size-3.5 text-emerald-600" />
            مشاركة
          </button>
          <Link
            href={`/fatwas/${fatwa.id}`}
            className="rounded-xl bg-emerald-500 px-4 py-1 text-white transition hover:bg-emerald-600"
          >
            قراءة كاملة
          </Link>
        </div>
      </div>
    </article>
  );
};
