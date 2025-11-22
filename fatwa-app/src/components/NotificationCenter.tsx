"use client";

import { useNotifications } from "@/providers/NotificationProvider";
import { X } from "lucide-react";

export const NotificationCenter = () => {
  const { notifications, dismiss } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed left-4 bottom-4 flex flex-col gap-3 text-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="relative flex min-w-[260px] items-center gap-3 rounded-xl bg-white/95 px-4 py-3 text-[#0d3d29] shadow-lg shadow-emerald-100 ring-1 ring-emerald-100 backdrop-blur"
        >
          <span>{notification.message}</span>
          <button
            type="button"
            onClick={() => dismiss(notification.id)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-700 hover:text-emerald-900"
            aria-label="إغلاق الإشعار"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
