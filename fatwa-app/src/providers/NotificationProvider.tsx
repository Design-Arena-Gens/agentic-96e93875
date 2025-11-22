"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface Notification {
  id: string;
  message: string;
}

interface NotificationContextValue {
  notifications: Notification[];
  notify: (message: string) => void;
  dismiss: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const dismiss = useCallback((id: string) => {
    setNotifications((current) => current.filter((item) => item.id !== id));
  }, []);

  const notify = useCallback(
    (message: string) => {
      const id =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : Math.random().toString(16).slice(2);
      setNotifications((current) => [...current, { id, message }]);
      setTimeout(() => dismiss(id), 6000);
    },
    [dismiss]
  );

  const value = useMemo(
    () => ({
      notifications,
      notify,
      dismiss,
    }),
    [notifications, notify, dismiss]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("يجب استخدام useNotifications داخل NotificationProvider.");
  }
  return context;
};
