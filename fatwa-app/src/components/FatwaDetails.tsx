"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useFatwaContext } from "@/providers/FatwaProvider";
import { ArrowRight, Share2 } from "lucide-react";
import type { Fatwa } from "@/types/fatwa";

interface Props {
  fatwaId: string;
}

export const FatwaDetails = ({ fatwaId }: Props) => {
  const { fatwas, toggleFavorite, favorites } = useFatwaContext();

  const fatwa: Fatwa | undefined = useMemo(
    () => fatwas.find((item) => item.id === fatwaId),
    [fatwas, fatwaId]
  );

  if (!fatwa) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-3xl border border-emerald-100 bg-white px-6 py-16 text-center">
        <p className="text-lg font-semibold text-[#0b7a45]">
          لم يتم العثور على هذه الفتوى
        </p>
        <p className="text-sm text-emerald-600">
          ربما تم تحديث الرابط أو حذف الفتوى. يمكنك العودة إلى الصفحة الرئيسية
          والبحث مرة أخرى.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-600"
        >
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(fatwa.id);

  const share = async () => {
    const payload = {
      title: fatwa.title,
      text: fatwa.content.slice(0, 150),
      url: `${window.location.origin}/fatwas/${fatwa.id}`,
    };
    if (navigator.share) {
      await navigator.share(payload);
    } else {
      await navigator.clipboard.writeText(payload.url);
      alert("تم نسخ رابط الفتوى.");
    }
  };

  return (
    <article className="flex flex-col gap-6 rounded-3xl border border-emerald-100 bg-white px-6 py-8 shadow-sm shadow-emerald-100">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-emerald-600 transition hover:text-emerald-700"
        >
          <ArrowRight className="size-4" />
          العودة
        </Link>
        <div className="flex items-center gap-2 text-xs text-emerald-500">
          <span>{fatwa.category}</span>
          <span>·</span>
          <time dateTime={fatwa.createdAt}>
            {new Date(fatwa.createdAt).toLocaleDateString("ar-EG", {
              dateStyle: "medium",
            })}
          </time>
          <span>·</span>
          <span>{fatwa.views.toLocaleString("ar-EG")} قراءة</span>
        </div>
      </div>
      <header className="flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold leading-[1.6] text-[#0b7a45]">
          {fatwa.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-600">
          {(fatwa.keywords ?? []).map((keyword) => (
            <span
              key={keyword}
              className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-600"
            >
              #{keyword}
            </span>
          ))}
        </div>
      </header>
      <div className="space-y-4 leading-9 text-emerald-800">
        {fatwa.content.split("\n").map((paragraph, index) => (
          <p key={index} className="text-base">
            {paragraph}
          </p>
        ))}
      </div>
      {fatwa.attachments && fatwa.attachments.length > 0 && (
        <div className="flex flex-col gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-5 py-4 text-sm text-emerald-700">
          <p className="font-semibold text-[#0b7a45]">مرفقات</p>
          <ul className="space-y-1">
            {fatwa.attachments.map((attachment) => (
              <li key={attachment}>
                <a
                  href={attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 underline hover:text-emerald-700"
                >
                  تنزيل الملف
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => toggleFavorite(fatwa.id)}
          className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition ${
            isFavorite
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          }`}
        >
          {isFavorite ? "إزالة من المفضلة" : "حفظ في المفضلة"}
        </button>
        <button
          type="button"
          onClick={share}
          className="inline-flex items-center gap-2 rounded-2xl border border-emerald-100 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
        >
          <Share2 className="size-4" />
          مشاركة الفتوى
        </button>
      </div>
    </article>
  );
};
