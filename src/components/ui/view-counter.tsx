"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatViewCount, getViewCount, recordView } from "@/lib/view-tracker";
import { useLanguage } from "@/context/LanguageContext";

export interface ViewCounterProps {
  /** Content category/collection type e.g. "article", "blog", "news", "event" */
  type: string;
  /** Unique ID or slug for the content item */
  idOrSlug: string;
  /** Initial view count from database / props */
  initialCount?: number;
  /** Automatically increment view on mount (useful for detail pages) */
  autoTrack?: boolean;
  /** Optional custom CSS classes */
  className?: string;
  /** Visual display style */
  variant?: "badge" | "inline" | "header";
  /** Show eye icon alongside count */
  showIcon?: boolean;
}

export function ViewCounter({
  type,
  idOrSlug,
  initialCount = 0,
  autoTrack = false,
  className,
  variant = "inline",
  showIcon = true,
}: ViewCounterProps) {
  const { t } = useLanguage();
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    if (autoTrack) {
      const updated = recordView(type, idOrSlug, initialCount);
      setCount(updated);
    } else {
      const current = getViewCount(type, idOrSlug, initialCount);
      setCount(current);
    }
  }, [type, idOrSlug, initialCount, autoTrack]);

  const formatted = formatViewCount(count);
  const viewsLabel = t("common.views") !== "common.views" ? t("common.views") : "views";

  if (variant === "badge") {
    return (
      <span
        data-slot="view-counter"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300",
          "motion-safe:transition-all duration-200",
          className
        )}
      >
        {showIcon && <Eye className="h-3.5 w-3.5 text-[#2A629A] dark:text-blue-400 shrink-0" aria-hidden="true" />}
        <span>{formatted}</span>
        <span className="text-[11px] text-slate-400 lowercase">{viewsLabel}</span>
      </span>
    );
  }

  if (variant === "header") {
    return (
      <div
        data-slot="view-counter"
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm",
          className
        )}
      >
        {showIcon && <Eye className="h-4 w-4 text-[#FFDA78] shrink-0" aria-hidden="true" />}
        <span>{formatted} {viewsLabel}</span>
      </div>
    );
  }

  return (
    <span
      data-slot="view-counter"
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400",
        className
      )}
    >
      {showIcon && <Eye className="h-3.5 w-3.5 text-[#2A629A] shrink-0" aria-hidden="true" />}
      <span>{formatted} {viewsLabel}</span>
    </span>
  );
}
