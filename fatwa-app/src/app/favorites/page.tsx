import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { FavoritesList } from "@/components/FavoritesList";

export default function FavoritesPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1450px] gap-6 px-4 py-6 lg:px-8">
      <Sidebar />
      <main className="flex w-full flex-col gap-6">
        <Header />
        <section className="flex flex-col gap-5 rounded-3xl border border-emerald-100 bg-white px-6 py-8 shadow-sm shadow-emerald-100">
          <header className="flex flex-col gap-2">
            <p className="text-xs text-emerald-500">قائمتك الخاصة</p>
            <h1 className="text-2xl font-semibold text-[#0b7a45]">
              الفتاوى المفضلة
            </h1>
            <p className="text-sm text-emerald-600">
              جميع الفتاوى التي قمت بحفظها تظهر هنا لتسهيل الوصول إليها حين
              الحاجة.
            </p>
          </header>
          <FavoritesList />
        </section>
      </main>
    </div>
  );
}
