export type FatwaCategory =
  | "العبادات"
  | "المعاملات"
  | "الأسرة"
  | "العقيدة"
  | "الأخلاق"
  | "فتاوى عامة";

export interface Fatwa {
  id: string;
  title: string;
  content: string;
  category: FatwaCategory;
  views: number;
  createdAt: string;
  keywords?: string[];
  attachments?: string[];
}

export interface FatwaQuestionPayload {
  name: string;
  question: string;
  attachmentUrl?: string;
  createdAt: string;
}
