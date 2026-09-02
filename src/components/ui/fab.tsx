"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export interface FABProps {
  /** Target link URL, defaults to "/join" */
  href?: string;
  /** Optional custom label, defaults to translated "nav.join" */
  label?: string;
  /** Optional custom icon component, defaults to UserPlus */
  icon?: React.ComponentType<{ className?: string }>;
  /** Always show text label alongside icon */
  showLabel?: boolean;
  /** Allow expanding to show label on tap/interaction */
  expandable?: boolean;
  /** Additional custom class names */
  className?: string;
  /** Enable or disable hide on scroll-down behavior (default: true) */
  hideOnScroll?: boolean;
}

export function FAB({
  href = "/join",
  label,
  icon: Icon = UserPlus,
  showLabel = false,
  expandable = false,
  className,
  hideOnScroll = true,
}: FABProps) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const lastScrollY = useRef(0);

  const displayLabel = label || t("nav.join") || "Join SSD";

  // Trigger subtle initial appearance animation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Smart scroll detection: hides on scroll-down, shows on scroll-up
  useEffect(() => {
    if (!hideOnScroll) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always display when close to the top of the viewport
      if (currentScrollY < 10) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Calculate scroll difference to avoid jittering
      const diff = currentScrollY - lastScrollY.current;
      if (Math.abs(diff) > 6) {
        if (diff > 0) {
          // Scrolling down -> hide FAB
          setVisible(false);
        } else {
          // Scrolling up -> show FAB
          setVisible(true);
        }
        lastScrollY.current = currentScrollY <= 0 ? 0 : currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideOnScroll]);

  return (
    <div
      data-slot="fab"
      className={cn(
        "fixed bottom-20 right-4 z-50 lg:hidden transition-all duration-300 ease-in-out",
        visible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-20 opacity-0 pointer-events-none scale-95"
      )}
    >
      {/* Subtle pulsing glow aura on initial appearance */}
      {isMounted && (
        <span
          className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#FF7F3E] to-[#ff9a5c] opacity-60 blur-sm animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Main Floating Action Button Link */}
      <Link
        href={href}
        aria-label={displayLabel}
        onClick={() => {
          if (expandable && !isExpanded) {
            setIsExpanded(true);
          }
        }}
        className={cn(
          "group relative flex items-center justify-center rounded-full text-white font-medium",
          "bg-gradient-to-r from-[#FF7F3E] to-[#ff9a5c]",
          "shadow-lg shadow-[#FF7F3E]/30 hover:shadow-xl hover:shadow-[#FF7F3E]/40",
          "hover:brightness-105 active:scale-95 active:brightness-95",
          "transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7F3E] focus-visible:ring-offset-2",
          showLabel || isExpanded
            ? "h-14 px-5 gap-2.5 min-w-[56px]"
            : "h-14 w-14",
          className
        )}
      >
        <Icon className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:scale-110" />

        {/* Text Label */}
        {showLabel || isExpanded ? (
          <span className="text-sm font-semibold tracking-wide whitespace-nowrap animate-in fade-in duration-200">
            {displayLabel}
          </span>
        ) : (
          <span className="sr-only">{displayLabel}</span>
        )}
      </Link>
    </div>
  );
}
