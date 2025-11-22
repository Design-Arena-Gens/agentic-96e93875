"use client";

import Link from "next/link";
import { CategoryChips } from "./CategoryChips";
import { FatwaCard } from "./FatwaCard";
import { useFatwaContext } from "@/providers/FatwaProvider";
import { BookOpenCheck, Flame, Loader2 } from "lucide-react";

export const HomeScreen = () => {
  const {
    filteredFatwas,
    popularFatwas,
    latestFatwas,
    isFirebaseReady,
    fatwas,
  } = useFatwaContext();

  const hasResults = filteredFatwas.length > 0;

  return (
    <div className="flex flex-col gap-10">
      <section className="grid gap-6 rounded-3xl bg-gradient-to-br from-emerald-500 via-emerald-400 to-emerald-600 px-8 py-10 text-white shadow-lg shadow-emerald-200 md:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-100">
            فتاوى موثوقة
          </span>
          <h2 className="text-3xl font-bold leading-[1.6] md:text-4xl">
            ابحث عن الإجابات الشرعية بسرعة وشارك ما يفيدك مع الآخرين
          </h2>
          <p className="text-lg text-emerald-50">
            نعرض لك أحدث الفتاوى المصنفة بعناية مع إمكانية حفظ المفضلة وإرسال
            أسئلتك لفريق الإفتاء.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href="/ask"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-emerald-600 shadow-lg shadow-emerald-200 transition hover:bg-emerald-50"
            >
              <BookOpenCheck className="size-4" />
              أرسل سؤالك الآن
            </Link>
            <Link
              href="/favorites"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/40 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
            >
              <Flame className="size-4" />
              المفضلة لديك
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/20 bg-white/15 p-6 text-emerald-50 backdrop-blur-sm">
          <p className="text-sm font-semibold text-white">
            لوحة إحصائيات سريعة
          </p>
          <div className="mt-4 grid gap-4 text-sm">
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <p className="text-white/70">عدد الفتاوى</p>
              <p className="mt-1 text-2xl font-bold">
                {fatwas.length.toLocaleString("ar-EG")}
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <p className="text-white/70">آخر تحديث</p>
              <p className="mt-1 text-lg font-semibold">
                {latestFatwas[0]
                  ? new Date(latestFatwas[0].createdAt).toLocaleString("ar-EG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "—"}
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <p className="text-white/70">أكثر الأقسام تداولاً</p>
              <p className="mt-1 text-lg font-semibold">
                {popularFatwas[0]?.category ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-[#0b7a45]">
            تصفح حسب الأقسام
          </h2>
          {!isFirebaseReady && (
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/80 bg-white px-3 py-1 text-xs text-emerald-600 shadow-sm shadow-emerald-100">
              <Loader2 className="size-3 animate-spin text-emerald-500" />
              يتم تحميل البيانات من Firebase
            </div>
          )}
        </div>
        <CategoryChips />
      </section>

      <section className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#0b7a45]">
              أحدث الفتاوى
            </h3>
            <Link
              href="/fatwas/latest"
              className="text-sm text-emerald-600 hover:text-emerald-700"
            >
              استعرض الكل
            </Link>
          </div>
          <div className="grid gap-4">
            {latestFatwas.slice(0, 3).map((fatwa) => (
              <FatwaCard key={fatwa.id} fatwa={fatwa} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm shadow-emerald-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#0b7a45]">
              الأكثر قراءة
            </h3>
            <span className="text-xs text-emerald-500">تحديث آلي</span>
          </div>
          <div className="flex flex-col gap-3">
            {popularFatwas.slice(0, 5).map((fatwa) => (
              <Link
                key={fatwa.id}
                href={`/fatwas/${fatwa.id}`}
                className="flex flex-col rounded-2xl bg-emerald-50 px-4 py-3 text-sm transition hover:bg-emerald-100"
              >
                <span className="font-semibold text-[#0b7a45]">
                  {fatwa.title}
                </span>
                <span className="text-xs text-emerald-600">
                  {fatwa.category} · {fatwa.views.toLocaleString("ar-EG")} قراءة
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#0b7a45]">
            كل الفتاوى
          </h3>
          <span className="text-xs text-emerald-500">
            {filteredFatwas.length} نتيجة
          </span>
        </div>
        {hasResults ? (
          <div className="grid gap-5 md:grid-cols-2">
            {filteredFatwas.map((fatwa) => (
              <FatwaCard key={fatwa.id} fatwa={fatwa} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-emerald-100 bg-white px-6 py-16 text-center text-emerald-600">
            <p className="text-lg font-semibold text-[#0b7a45]">
              لم يتم العثور على نتائج مطابقة
            </p>
            <p className="max-w-md text-sm text-emerald-500">
              جرّب استخدام كلمة مفتاحية عامة أو اختيار قسم مختلف لعرض فتاوى
              إضافية.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
