"use client";

import { useFatwaContext } from "@/providers/FatwaProvider";
import type { FatwaCategory } from "@/types/fatwa";

const categories: (FatwaCategory | "الكل")[] = [
  "الكل",
  "العبادات",
  "المعاملات",
  "الأسرة",
  "العقيدة",
  "الأخلاق",
  "فتاوى عامة",
];

export const CategoryChips = () => {
  const { activeCategory, setActiveCategory } = useFatwaContext();

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((category) => {
        const isActive = activeCategory === category || (!activeCategory && category === "الكل");
        return (
          <button
            key={category}
            type="button"
            onClick={() =>
              category === "الكل"
                ? setActiveCategory(null)
                : setActiveCategory(category as FatwaCategory | "الكل")
            }
            className={`rounded-2xl border px-5 py-2 text-sm font-medium transition ${
              isActive
                ? "border-emerald-400 bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                : "border-emerald-100 bg-white text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};
