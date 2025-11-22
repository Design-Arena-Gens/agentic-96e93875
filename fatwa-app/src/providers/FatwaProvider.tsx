"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Fatwa, FatwaCategory } from "@/types/fatwa";
import { sampleFatwas } from "@/data/sampleFatwas";
import {
  listenToFatwas,
  listenToPopularFatwas,
  submitQuestion,
  uploadAttachment,
} from "@/lib/firebase";
import { useNotifications } from "./NotificationProvider";

interface FatwaContextValue {
  fatwas: Fatwa[];
  filteredFatwas: Fatwa[];
  popularFatwas: Fatwa[];
  latestFatwas: Fatwa[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  activeCategory: FatwaCategory | "الكل" | null;
  setActiveCategory: (value: FatwaCategory | "الكل" | null) => void;
  submitNewQuestion: (
    payload: { name: string; question: string; file?: File | null }
  ) => Promise<void>;
  isFirebaseReady: boolean;
  firebaseError?: string;
}

const FatwaContext = createContext<FatwaContextValue | undefined>(undefined);

const FAVORITES_KEY = "fatwa-favorites";

const loadFavorites = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites: string[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {
    // noop
  }
};

export const FatwaProvider = ({ children }: { children: React.ReactNode }) => {
  const [fatwas, setFatwas] = useState<Fatwa[]>(sampleFatwas);
  const [popularFatwas, setPopularFatwas] = useState<Fatwa[]>(sampleFatwas);
  const [favorites, setFavorites] = useState<string[]>(loadFavorites);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    FatwaCategory | "الكل" | null
  >(null);
  const [firebaseError, setFirebaseError] = useState<string | undefined>(
    undefined
  );
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const hasLoadedRef = useRef(false);
  const { notify } = useNotifications();

  useEffect(() => {
    const unsubscribeMain = listenToFatwas(
      (items) => {
        setFatwas((prev) => {
          if (items.length === 0) {
            return prev;
          }

          if (hasLoadedRef.current) {
            const prevIds = new Set(prev.map((item) => item.id));
            items.forEach((item) => {
              if (!prevIds.has(item.id)) {
                notify(`تمت إضافة فتوى جديدة: ${item.title}`);
              }
            });
          }

          hasLoadedRef.current = true;
          return items;
        });
        setIsFirebaseReady(true);
        setFirebaseError(undefined);
      },
      (error) => {
        console.error(error);
        setFirebaseError("تعذر الاتصال بقاعدة البيانات، يتم عرض بيانات تجريبية.");
        setIsFirebaseReady(false);
      }
    );

    const unsubscribePopular = listenToPopularFatwas(
      (items) => {
        setPopularFatwas(items.length > 0 ? items : sampleFatwas);
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      unsubscribeMain();
      unsubscribePopular();
    };
  }, [notify]);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  }, []);

  const latestFatwas = useMemo(
    () =>
      [...fatwas]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 6),
    [fatwas]
  );

  const filteredFatwas = useMemo(() => {
    const normalizedSearch = searchTerm.trim();
    return fatwas.filter((fatwa) => {
      const matchesCategory =
        !activeCategory || activeCategory === "الكل"
          ? true
          : fatwa.category === activeCategory;
      const matchesSearch =
        normalizedSearch.length === 0
          ? true
          : [fatwa.title, fatwa.content, fatwa.keywords?.join(" ") ?? ""]
              .join(" ")
              .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [fatwas, searchTerm, activeCategory]);

  const submitNewQuestion = useCallback(
    async ({
      name,
      question,
      file,
    }: {
      name: string;
      question: string;
      file?: File | null;
    }) => {
      try {
        let attachmentUrl: string | undefined;
        if (file) {
          attachmentUrl = await uploadAttachment(file);
        }
        await submitQuestion({
          name,
          question,
          attachmentUrl,
        });
        notify("تم إرسال سؤالك بنجاح، سيتم مراجعته من قبل المشرفين.");
      } catch (error) {
        console.error(error);
        notify("تعذر إرسال السؤال حاليًا، برجاء المحاولة لاحقًا.");
        throw error;
      }
    },
    [notify]
  );

  const value = useMemo(
    () => ({
      fatwas,
      filteredFatwas,
      popularFatwas,
      latestFatwas,
      favorites,
      toggleFavorite,
      searchTerm,
      setSearchTerm,
      activeCategory,
      setActiveCategory,
      submitNewQuestion,
      isFirebaseReady,
      firebaseError,
    }),
    [
      fatwas,
      filteredFatwas,
      popularFatwas,
      latestFatwas,
      favorites,
      toggleFavorite,
      searchTerm,
      activeCategory,
      submitNewQuestion,
      isFirebaseReady,
      firebaseError,
    ]
  );

  return (
    <FatwaContext.Provider value={value}>{children}</FatwaContext.Provider>
  );
};

export const useFatwaContext = () => {
  const context = useContext(FatwaContext);
  if (!context) {
    throw new Error("يجب استخدام useFatwaContext داخل FatwaProvider.");
  }
  return context;
};
