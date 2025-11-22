"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Info,
  ShieldCheck,
  Star,
  Home,
  CircleHelp,
  Sparkles,
} from "lucide-react";

const menuItems = [
  {
    label: "الرئيسية",
    href: "/",
    icon: Home,
  },
  {
    label: "المفضلة",
    href: "/favorites",
    icon: Star,
  },
  {
    label: "اسأل سؤالاً",
    href: "/ask",
    icon: CircleHelp,
  },
  {
    label: "حول التطبيق",
    href: "/about",
    icon: Info,
  },
  {
    label: "سياسة الخصوصية",
    href: "/privacy",
    icon: ShieldCheck,
  },
];

export const Sidebar = ({ isDrawer = false }: { isDrawer?: boolean }) => {
  const pathname = usePathname();

  return (
    <aside
      className={`${
        isDrawer ? "flex h-full w-full" : "hidden lg:flex"
      } h-screen max-h-screen w-64 flex-shrink-0 flex-col gap-4 overflow-y-auto rounded-3xl border border-emerald-50 bg-white/90 px-5 py-8 shadow-sm shadow-emerald-50 backdrop-blur`}
    >
      <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3">
        <Sparkles className="size-6 text-emerald-600" />
        <div>
          <p className="text-sm text-emerald-600">موسوعة الفتاوى</p>
          <p className="text-base font-semibold text-[#0b7a45]">
            الفقه بين يديك
          </p>
        </div>
      </div>
      <nav className="flex flex-col gap-1 text-sm font-medium text-emerald-900">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                isActive
                  ? "bg-emerald-100 text-emerald-900 shadow-inner shadow-emerald-100"
                  : "text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              <Icon className="size-5 text-emerald-600" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-dashed border-emerald-100 bg-gradient-to-br from-white via-white to-emerald-50 px-4 py-5 text-emerald-800">
        <p className="text-sm font-semibold text-emerald-700">
          تحديثات الفتاوى
        </p>
        <p className="mt-2 text-xs leading-5 text-emerald-600">
          قم بتفعيل الإشعارات لتصلك أحدث الفتاوى خلال دقائق من نشرها.
        </p>
      </div>
    </aside>
  );
};
