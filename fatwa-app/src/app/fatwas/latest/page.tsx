import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { LatestFatwasList } from "@/components/LatestFatwasList";

export default function LatestFatwasPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1450px] gap-6 px-4 py-6 lg:px-8">
      <Sidebar />
      <main className="flex w-full flex-col gap-6">
        <Header />
        <section className="flex flex-col gap-6 rounded-3xl border border-emerald-100 bg-white px-6 py-8 shadow-sm shadow-emerald-100">
          <header className="flex flex-col gap-2">
            <p className="text-xs text-emerald-500">آخر الإصدارات</p>
            <h1 className="text-3xl font-semibold text-[#0b7a45]">
              أحدث الفتاوى المضافة
            </h1>
            <p className="text-sm text-emerald-600">
              يتم تحديث هذه القائمة مباشرة من قاعدة البيانات لعرض أحدث ما تم
              نشره من فتاوى.
            </p>
          </header>
          <LatestFatwasList />
        </section>
      </main>
    </div>
  );
}
