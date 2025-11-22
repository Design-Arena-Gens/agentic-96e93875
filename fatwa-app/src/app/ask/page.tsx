import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { AskQuestionForm } from "@/components/AskQuestionForm";
import Link from "next/link";

export default function AskPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1450px] gap-6 px-4 py-6 lg:px-8">
      <Sidebar />
      <main className="flex w-full flex-col gap-6">
        <Header />
        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <AskQuestionForm />
          <div className="flex flex-col gap-5 rounded-3xl border border-emerald-100 bg-white px-6 py-8 shadow-sm shadow-emerald-100">
            <div>
              <h2 className="text-xl font-semibold text-[#0b7a45]">
                إرشادات إرسال السؤال
              </h2>
              <p className="mt-2 text-sm text-emerald-600">
                لتسهيل الرد عليك، يرجى كتابة السؤال بصيغة واضحة، وذكر أي تفاصيل
                مرتبطة بالزمان أو المكان أو الحالة الاجتماعية.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-emerald-700">
              <li>استعرض الفتاوى السابقة للتأكد من عدم وجود إجابة مشابهة.</li>
              <li>يمكنك إرفاق ملف يوضح الحالة مثل عقد أو صورة مستند.</li>
              <li>سيتم الرد خلال 48 ساعة عبر البريد المرتبط بحسابك.</li>
            </ul>
            <p className="text-sm text-emerald-600">
              بمجرّد إرسال السؤال، توافق على{" "}
              <Link
                href="/privacy"
                className="text-emerald-700 underline hover:text-emerald-900"
              >
                سياسة الخصوصية
              </Link>{" "}
              الخاصة بنا.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
