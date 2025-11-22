"use client";

import { useMemo } from "react";
import { useFatwaContext } from "@/providers/FatwaProvider";
import { FatwaCard } from "./FatwaCard";

export const FavoritesList = () => {
  const { favorites, fatwas } = useFatwaContext();

  const favoriteFatwas = useMemo(
    () => fatwas.filter((fatwa) => favorites.includes(fatwa.id)),
    [fatwas, favorites]
  );

  if (favoriteFatwas.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-emerald-100 bg-white px-6 py-16 text-center text-emerald-600">
        <p className="text-lg font-semibold text-[#0b7a45]">
          لم تضف أي فتوى إلى المفضلة بعد
        </p>
        <p className="max-w-md text-sm text-emerald-500">
          يمكنك من خلال زر &quot;حفظ في المفضلة&quot; تخصيص قائمة خاصة بك للرجوع
          إلى الفتاوى التي تهمك لاحقًا.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {favoriteFatwas.map((fatwa) => (
        <FatwaCard key={fatwa.id} fatwa={fatwa} />
      ))}
    </div>
  );
};
