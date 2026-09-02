"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, Shield, UserPlus, LogIn, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export type AccessRestriction = "public" | "registered" | "members_only";

export interface AccessGateProps {
  /** Full content to display when user meets access requirements */
  children: React.ReactNode;
  /** Access tier required to view full content */
  restriction?: AccessRestriction;
  /** Explicit override flag: whether this item is restricted */
  isRestricted?: boolean;
  /** Optional custom preview element to show above the lock card */
  preview?: React.ReactNode;
  /** Title shown on the restriction callout card */
  title?: string;
  /** Description shown on the restriction callout card */
  description?: string;
  /** Additional container styling */
  className?: string;
}

export function AccessGate({
  children,
  restriction = "public",
  isRestricted = false,
  preview,
  title,
  description,
  className,
}: AccessGateProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const { t } = useLanguage();
  const pathname = usePathname();

  // If public or not restricted, render children directly
  const requiresAuth = isRestricted || restriction === "registered" || restriction === "members_only";

  // During SSR or before Clerk loads, render children or preview conservatively
  if (!requiresAuth || (isLoaded && isSignedIn)) {
    return <>{children}</>;
  }

  const defaultTitle = restriction === "members_only"
    ? t("auth.membersOnly")
    : t("auth.loginToRead");

  const defaultDescription = t("auth.joinToAccess");

  return (
    <div data-slot="access-gate" className={cn("relative my-4", className)}>
      {/* Blurred Preview Content */}
      <div className="relative max-h-72 overflow-hidden select-none pointer-events-none opacity-60 filter blur-[0.5px]">
        {preview || children}
        {/* Gradient fade overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-transparent z-10"
          aria-hidden="true"
        />
      </div>

      {/* Access Control Callout Card */}
      <div className="relative -mt-20 z-20 mx-auto max-w-xl rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 md:p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-md text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#003285]/10 text-[#003285] dark:bg-blue-950/50 dark:text-blue-400">
          <Shield className="h-7 w-7 text-[#FF7F3E]" />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF7F3E]/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-[#d95720] mb-3">
          <Lock className="h-3 w-3" />
          {restriction === "members_only" ? "Members Exclusive" : "Reader Registration"}
        </span>

        <h3 className="text-xl md:text-2xl font-black text-[#003285] dark:text-white mb-2 leading-tight">
          {title || defaultTitle}
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6 max-w-md mx-auto">
          {description || defaultDescription}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-[#003285] hover:bg-[#002561] text-white font-bold rounded-full px-7 shadow-md"
          >
            <Link href={`/sign-in?redirect_url=${encodeURIComponent(pathname || "/")}`}>
              <LogIn className="mr-2 h-4 w-4" />
              {t("auth.signIn")}
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-slate-300 dark:border-slate-700 text-[#003285] dark:text-white font-bold rounded-full px-6 hover:bg-slate-50"
          >
            <Link href="/join">
              <UserPlus className="mr-2 h-4 w-4 text-[#FF7F3E]" />
              {t("nav.join")}
            </Link>
          </Button>
        </div>

        <div className="mt-6 border-t border-slate-100 dark:border-slate-800/60 pt-4 text-xs font-semibold text-slate-400 flex items-center justify-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-[#FFDA78]" />
          <span>Samta Sainik Dal • Soldiers for Equality</span>
        </div>
      </div>
    </div>
  );
}
