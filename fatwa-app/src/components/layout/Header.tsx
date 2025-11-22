"use client";

import Link from "next/link";
import { useFatwaContext } from "@/providers/FatwaProvider";
import { BellRing, Search, Pencil, Menu } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "./Sidebar";

export const Header = () => {
  const { searchTerm, setSearchTerm, firebaseError } = useFatwaContext();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 flex flex-col gap-4 rounded-3xl bg-white/95 px-6 py-5 shadow-sm shadow-emerald-100 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-700 shadow-sm shadow-emerald-50 lg:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="فتح القائمة"
          >
            <Menu className="size-5" />
          </button>
          <div className="flex flex-col">
            <p className="text-xs text-emerald-600">مركز الفتوى</p>
            <h1 className="text-xl font-semibold text-emerald-900">
              مرحبًا بك، استكشف أحكام دينك بسهولة
            </h1>
          </div>
          <Link
            href="/ask"
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600"
          >
            <Pencil className="size-4" />
            اسأل سؤالاً جديداً
          </Link>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-200">
            <Search className="size-5 text-emerald-600" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="ابحث عن فتوى أو كلمة مفتاحية..."
              className="w-full bg-transparent text-sm text-emerald-900 outline-none placeholder:text-emerald-500"
            />
          </div>
          <Link
            href="/fatwas/latest"
            className="inline-flex items-center gap-2 self-stretch rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
          >
            <BellRing className="size-4 text-emerald-500" />
            آخر التحديثات
          </Link>
        </div>
        {firebaseError && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {firebaseError}
          </div>
        )}
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative z-50 h-full w-64 max-w-[80vw]">
            <Sidebar isDrawer />
          </div>
        </div>
      )}
    </>
  );
};
