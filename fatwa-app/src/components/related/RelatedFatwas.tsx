"use client";

import Link from "next/link";
import { useFatwaContext } from "@/providers/FatwaProvider";

export const RelatedFatwas = ({ activeId }: { activeId: string }) => {
  const { fatwas } = useFatwaContext();

  const selected = fatwas.find((item) => item.id === activeId);
  const related = selected
    ? fatwas
        .filter(
          (item) =>
            item.id !== activeId &&
            (item.category === selected.category ||
              item.keywords?.some((keyword) =>
                selected.keywords?.includes(keyword)
              ))
        )
        .slice(0, 5)
    : fatwas.slice(0, 5);

  if (related.length === 0) {
    return null;
  }

  return (
    <aside className="flex flex-col gap-4 rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm shadow-emerald-100">
      <h3 className="text-lg font-semibold text-[#0b7a45]">فتاوى مرتبطة</h3>
      <div className="flex flex-col gap-3 text-sm text-emerald-700">
        {related.map((fatwa) => (
          <Link
            key={fatwa.id}
            href={`/fatwas/${fatwa.id}`}
            className="rounded-2xl bg-emerald-50 px-4 py-3 transition hover:bg-emerald-100"
          >
            <span className="font-semibold text-[#0b7a45]">{fatwa.title}</span>
            <span className="mt-2 block text-xs text-emerald-600">
              {fatwa.category}
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
};
