"use client";

import { FormEvent, useRef, useState } from "react";
import { useFatwaContext } from "@/providers/FatwaProvider";
import { Loader2, UploadCloud } from "lucide-react";

export const AskQuestionForm = () => {
  const { submitNewQuestion } = useFatwaContext();
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim()) return;

    setIsSubmitting(true);
    try {
      await submitNewQuestion({ name: name.trim() || "مستخدم", question, file });
      setName("");
      setQuestion("");
      setFile(null);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-3xl border border-emerald-100 bg-white px-6 py-8 shadow-sm shadow-emerald-100"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-semibold text-emerald-800">
          الاسم
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="مثال: محمد أحمد"
          className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="question"
          className="text-sm font-semibold text-emerald-800"
        >
          السؤال
        </label>
        <textarea
          id="question"
          name="question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="اكتب سؤالك بالتفصيل ليتمكن العلماء من الإجابة بدقة..."
          rows={6}
          className="resize-none rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-emerald-800">
          مرفقات اختيارية
        </span>
        <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-dashed border-emerald-200 bg-white px-4 py-4 text-sm text-emerald-600 transition hover:border-emerald-300 hover:bg-emerald-50">
          <div className="flex items-center gap-3">
            <UploadCloud className="size-5 text-emerald-500" />
            <span>
              {file ? `ملف مختار: ${file.name}` : "ارفع صورة أو ملف بصيغة PDF"}
            </span>
          </div>
          <span className="rounded-xl bg-emerald-50 px-3 py-1 text-xs text-emerald-600">
            اختياري
          </span>
          <input
            ref={fileRef}
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            className="hidden"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !question.trim()}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        إرسال السؤال
      </button>
    </form>
  );
};
