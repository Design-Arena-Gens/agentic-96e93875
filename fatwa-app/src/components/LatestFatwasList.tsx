"use client";

import { FatwaCard } from "./FatwaCard";
import { useFatwaContext } from "@/providers/FatwaProvider";

export const LatestFatwasList = () => {
  const { latestFatwas } = useFatwaContext();

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {latestFatwas.map((fatwa) => (
        <FatwaCard key={fatwa.id} fatwa={fatwa} />
      ))}
    </div>
  );
};
