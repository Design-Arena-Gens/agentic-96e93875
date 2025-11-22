import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/providers/NotificationProvider";
import { FatwaProvider } from "@/providers/FatwaProvider";
import { NotificationCenter } from "@/components/NotificationCenter";

const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-tajawal",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "الفتاوى | موسوعة فقهية موثوقة",
  description:
    "منصة عربية موحدة للفتاوى الإسلامية مع إمكانية البحث، الاستفسار، والمفضلة.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} font-sans bg-[#f6faf7] text-[#0d3d29]`}>
        <NotificationProvider>
          <FatwaProvider>
            {children}
            <NotificationCenter />
          </FatwaProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
