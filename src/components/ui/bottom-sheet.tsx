"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Share2, Languages, Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const BOOKMARKS_STORAGE_KEY = "ssd_bookmarks";

export interface BottomSheetProps {
  /** Controlled open state of the sheet */
  open?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Optional custom trigger element instead of the default bottom pill handle */
  trigger?: React.ReactNode;
  /** Whether to show the default fixed mobile pill trigger (default: true) */
  showDefaultTrigger?: boolean;
  /** Custom class name for the default trigger button */
  triggerClassName?: string;
  /** Additional class name for the SheetContent */
  className?: string;
  /** Additional custom content to render inside the sheet below quick actions */
  children?: React.ReactNode;
}

export function BottomSheet({
  open,
  onOpenChange,
  trigger,
  showDefaultTrigger = true,
  triggerClassName,
  className,
  children,
}: BottomSheetProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check if current page is in bookmarks
  const checkBookmarkStatus = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (stored) {
        const bookmarks = JSON.parse(stored);
        if (Array.isArray(bookmarks)) {
          const currentPath = window.location.pathname;
          const currentUrl = window.location.href;
          setIsBookmarked(
            bookmarks.some(
              (item: string | { url?: string; href?: string; path?: string }) => {
                if (typeof item === "string") {
                  return item === currentPath || item === currentUrl;
                }
                return (
                  item?.url === currentUrl ||
                  item?.url === currentPath ||
                  item?.href === currentUrl ||
                  item?.href === currentPath ||
                  item?.path === currentPath
                );
              }
            )
          );
          return;
        }
      }
      setIsBookmarked(false);
    } catch {
      setIsBookmarked(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    checkBookmarkStatus();
  }, [checkBookmarkStatus]);

  // Handle Share functionality with navigator.share and clipboard fallback
  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const url = window.location.href;
    const title = document.title || "Samta Sainik Dal Delhi";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        return;
      } catch (error) {
        if ((error as Error)?.name === "AbortError") {
          return;
        }
      }
    }

    // Fallback to clipboard copy
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      toast.success(t("common.copiedToClipboard"));
    } catch (err) {
      console.error("Failed to copy URL to clipboard", err);
    }
  };

  // Handle Language Toggle
  const handleLanguageToggle = () => {
    const nextLang = language === "en" ? "hi" : "en";
    setLanguage(nextLang);
  };

  // Handle Bookmark Toggle
  const handleBookmarkToggle = () => {
    if (typeof window === "undefined") return;
    try {
      const currentPath = window.location.pathname;
      const currentUrl = window.location.href;
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      let bookmarks: Array<string | { url?: string; path?: string; title?: string; savedAt?: string }> = [];

      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            bookmarks = parsed;
          }
        } catch {
          bookmarks = [];
        }
      }

      const existingIndex = bookmarks.findIndex((item) => {
        if (typeof item === "string") {
          return item === currentPath || item === currentUrl;
        }
        return (
          item?.url === currentUrl ||
          item?.url === currentPath ||
          item?.path === currentPath
        );
      });

      if (existingIndex >= 0) {
        bookmarks.splice(existingIndex, 1);
        setIsBookmarked(false);
      } else {
        bookmarks.push({
          url: currentUrl,
          path: currentPath,
          title: document.title || "Samta Sainik Dal Delhi",
          savedAt: new Date().toISOString(),
        });
        setIsBookmarked(true);
      }

      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (err) {
      console.error("Failed to update bookmark in localStorage", err);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* Trigger: Either custom trigger or the default bottom pill handle on mobile */}
      {trigger ? (
        <SheetTrigger asChild>{trigger}</SheetTrigger>
      ) : showDefaultTrigger ? (
        <SheetTrigger asChild>
          <button
            type="button"
            data-slot="bottom-sheet-trigger"
            aria-label={t("common.quickActions")}
            className={cn(
              "fixed bottom-2 left-1/2 -translate-x-1/2 z-40 md:hidden",
              "flex items-center justify-center px-5 py-2 rounded-full",
              "bg-background/85 dark:bg-background/90 backdrop-blur-md",
              "border border-border/70 shadow-md hover:shadow-lg",
              "hover:bg-accent/80 active:scale-95 transition-all cursor-pointer group",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              triggerClassName
            )}
          >
            <span className="w-8 h-1 rounded-full bg-muted-foreground/40 group-hover:bg-muted-foreground/70 transition-colors" />
            <span className="sr-only">{t("common.quickActions")}</span>
          </button>
        </SheetTrigger>
      ) : null}

      <SheetContent
        side="bottom"
        data-slot="bottom-sheet-content"
        className={cn(
          "h-auto max-h-[85vh] rounded-t-2xl border-t border-border bg-background/95 backdrop-blur-md px-6 pt-3 pb-8 shadow-2xl",
          className
        )}
      >
        {/* Visual drag handle bar */}
        <div
          className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-muted-foreground/20"
          aria-hidden="true"
        />

        <SheetHeader className="text-left pb-2">
          <SheetTitle className="text-base font-semibold text-foreground">
            {t("common.quickActions")}
          </SheetTitle>
          <SheetDescription className="sr-only">
            {t("common.quickActions")}
          </SheetDescription>
        </SheetHeader>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-3 gap-3 w-full my-2">
          {/* Share Action */}
          <button
            type="button"
            onClick={handleShare}
            className="group flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border border-border/60 bg-card hover:bg-muted active:scale-95 transition-all text-foreground min-h-[76px] min-w-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-xs"
            aria-label={t("common.share")}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#2A629A] dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Share2 className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-foreground tracking-tight text-center truncate max-w-full">
              {t("common.share")}
            </span>
          </button>

          {/* Language Toggle Action */}
          <button
            type="button"
            onClick={handleLanguageToggle}
            className="group flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border border-border/60 bg-card hover:bg-muted active:scale-95 transition-all text-foreground min-h-[76px] min-w-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-xs"
            aria-label={t("common.language")}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#FF7F3E] group-hover:scale-110 transition-transform">
              <Languages className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-foreground tracking-tight text-center truncate max-w-full">
              {t("common.language")}
            </span>
          </button>

          {/* Bookmark Action */}
          <button
            type="button"
            onClick={handleBookmarkToggle}
            className="group flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border border-border/60 bg-card hover:bg-muted active:scale-95 transition-all text-foreground min-h-[76px] min-w-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-xs"
            aria-label={mounted && isBookmarked ? t("common.bookmarked") : t("common.bookmark")}
          >
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-transform group-hover:scale-110",
                mounted && isBookmarked
                  ? "bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {mounted && isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 fill-current" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </div>
            <span className="text-xs font-medium text-foreground tracking-tight text-center truncate max-w-full">
              {mounted && isBookmarked
                ? t("common.bookmarked")
                : t("common.bookmark")}
            </span>
          </button>
        </div>

        {/* Optional Custom Content */}
        {children && <div className="mt-4">{children}</div>}
      </SheetContent>
    </Sheet>
  );
}

export default BottomSheet;
