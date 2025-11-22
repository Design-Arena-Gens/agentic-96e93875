import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const values = [
  {
    title: "موثوقية المحتوى",
    description:
      "نراجع كل فتوى قبل نشرها لضمان التوافق مع القرآن والسنة وأقوال العلماء المعتبرين.",
  },
  {
    title: "سهولة الوصول",
    description:
      "نوفر تجربة استخدام بسيطة وسريعة تضمن إيجاد الإجابات خلال ثوانٍ مع دعم كامل للغة العربية.",
  },
  {
    title: "تواصل مباشر",
    description:
      "يمكنك إرسال سؤالك ورفق المستندات اللازمة ليجيب فريق الإفتاء المتخصص خلال وقت قصير.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1450px] gap-6 px-4 py-6 lg:px-8">
      <Sidebar />
      <main className="flex w-full flex-col gap-6">
        <Header />
        <section className="flex flex-col gap-6 rounded-3xl border border-emerald-100 bg-white px-6 py-8 shadow-sm shadow-emerald-100">
          <header className="flex flex-col gap-2">
            <p className="text-xs text-emerald-500">عن التطبيق</p>
            <h1 className="text-3xl font-semibold text-[#0b7a45]">
              رسالتنا في موسوعة الفتاوى
            </h1>
            <p className="text-sm text-emerald-600">
              نسعى لتمكين المستخدم من الوصول إلى المعرفة الشرعية الموثوقة بسهولة،
              مع توفير أدوات حديثة لتخصيص تجربة التعلم والسؤال.
            </p>
          </header>
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl border border-emerald-100 bg-emerald-50 px-5 py-5 text-emerald-700"
              >
                <h3 className="text-lg font-semibold text-[#0b7a45]">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-emerald-700">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-dashed border-emerald-100 bg-emerald-50/60 px-6 py-6 text-sm text-emerald-700">
            <p>
              تم تطوير هذا التطبيق ليدعم الهواتف الذكية العاملة بنظام Android 7
              فأعلى بالإضافة إلى العرض عبر الويب. تصميمه المتجاوب يجعله مناسبًا
              للهواتف والأجهزة اللوحية وسطح المكتب.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
