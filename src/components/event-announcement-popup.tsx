"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const NOTICE_IMAGE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/23-24%20sep-lTdPrTmRbKvNG2LxdGrrvV0qcrn7Ts.jpeg";
const NOTICE_DISMISSED_KEY = "ssd-event-notice-dismissed-2026-09";

export function EventAnnouncementPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(NOTICE_DISMISSED_KEY)) {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(NOTICE_DISMISSED_KEY, "true");
    } catch {
      // The dialog still closes when storage is unavailable.
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/70 p-2 backdrop-blur-sm sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Event announcement"
    >
      <div className="relative max-h-[calc(100dvh-1rem)] w-full max-w-[min(38rem,calc(100vw-1rem))] overflow-auto rounded-xl bg-card p-1.5 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:rounded-2xl sm:p-2">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close event announcement"
          className="absolute right-2 top-2 z-10 rounded-full bg-card/95 p-1.5 text-foreground shadow-md transition hover:bg-muted sm:right-3 sm:top-3 sm:p-2"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <Image
          src={NOTICE_IMAGE}
          alt="Samta Sainik Dal स्थापना दिवस समारोह notice"
          width={1200}
          height={1600}
          className="h-auto max-h-[calc(100dvh-2rem)] w-full rounded-lg object-contain sm:max-h-[calc(100dvh-4rem)] sm:rounded-xl"
          priority
        />
      </div>
    </div>
  );
}
