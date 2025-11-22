import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const sections = [
  {
    title: "البيانات التي نجمعها",
    items: [
      "اسم المستخدم والسؤال المرسل لخبراء الإفتاء.",
      "ملفات أو صور مرفقة لدراسة الحالة الشرعية.",
      "بيانات الاستخدام مثل الاحصائيات العامة لتحسين التجربة.",
    ],
  },
  {
    title: "كيف نستخدم البيانات",
    items: [
      "الإجابة على الأسئلة الشرعية وتصنيفها ضمن الأقسام المناسبة.",
      "تحسين محركات البحث داخل التطبيق وتقديم اقتراحات مرتبطة.",
      "إرسال إشعارات عند نشر فتوى جديدة إذا وافق المستخدم.",
    ],
  },
  {
    title: "حقوق المستخدم",
    items: [
      "لك الحق في طلب حذف سؤالك أو تعديل بياناتك عبر التواصل معنا.",
      "لن نشارك بياناتك مع أي جهة خارجية دون إذن صريح منك.",
      "نعتمد معايير أمنية متقدمة لحماية بياناتك المخزنة على Firebase.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1450px] gap-6 px-4 py-6 lg:px-8">
      <Sidebar />
      <main className="flex w-full flex-col gap-6">
        <Header />
        <section className="flex flex-col gap-6 rounded-3xl border border-emerald-100 bg-white px-6 py-8 shadow-sm shadow-emerald-100">
          <header className="flex flex-col gap-2">
            <p className="text-xs text-emerald-500">سياسة الخصوصية</p>
            <h1 className="text-3xl font-semibold text-[#0b7a45]">
              نلتزم بحماية بياناتك
            </h1>
            <p className="text-sm text-emerald-600">
              توضح هذه السياسة كيفية تعاملنا مع بيانات المستخدم وكيفية حمايتها
              ضمن البنية التحتية لـ Firebase.
            </p>
          </header>
          <div className="flex flex-col gap-5 text-sm text-emerald-700">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-3xl border border-emerald-100 bg-emerald-50 px-5 py-5"
              >
                <h2 className="text-lg font-semibold text-[#0b7a45]">
                  {section.title}
                </h2>
                <ul className="mt-3 space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="leading-7">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="rounded-3xl border border-dashed border-emerald-100 bg-emerald-50/60 px-5 py-4 text-sm text-emerald-700">
            للاستفسارات المتعلقة بالخصوصية، تواصل معنا عبر البريد:
            privacy@fatwa.app
          </p>
        </section>
      </main>
    </div>
  );
}
