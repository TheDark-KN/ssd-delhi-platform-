"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, LogIn, UserPlus, ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export interface AuthGuardProps {
  children: React.ReactNode;
  /** Custom title for the login prompt modal/card */
  title?: string;
  /** Custom description */
  description?: string;
  /** Optional role requirement (e.g. "admin") */
  requiredRole?: "admin" | "member" | "any";
  /** Fallback component to render while checking auth state */
  loadingFallback?: React.ReactNode;
}

/**
 * Route & section guard that renders an interactive Auth Prompt Modal / Overlay
 * whenever an unauthenticated visitor attempts to access protected pages (Dashboard, Admin, Membership Card, etc.)
 */
export function AuthGuard({
  children,
  title,
  description,
  requiredRole = "any",
  loadingFallback,
}: AuthGuardProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const { t } = useLanguage();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR or initial mount
  if (!mounted || !isLoaded) {
    return (
      loadingFallback || (
        <div className="container min-h-[60vh] flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="h-12 w-12 rounded-full border-4 border-[#003285] border-t-transparent animate-spin" />
            <p className="text-sm font-bold text-slate-500">Checking authentication...</p>
          </div>
        </div>
      )
    );
  }

  // If user is authenticated
  if (isSignedIn) {
    return <>{children}</>;
  }

  // If user is NOT authenticated, show the interactive Auth Modal / Popup
  const defaultTitle =
    requiredRole === "admin"
      ? "Admin Authentication Required"
      : title || "Sign In Required";

  const defaultDescription =
    requiredRole === "admin"
      ? "Please sign in with your authorized SSD administrator credentials to access management tools."
      : description || "You must be signed in to access your SSD Delhi member dashboard, digital membership card, and profile.";

  const redirectUrl = encodeURIComponent(pathname || "/dashboard");

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-slate-50/70 dark:bg-slate-950/70">
      {/* Modal / Card Container */}
      <div className="relative w-full max-w-lg rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-10 shadow-2xl text-center space-y-6 animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#003285]/10 dark:bg-blue-950/50 text-[#003285] dark:text-blue-400 ring-8 ring-[#003285]/5">
          <Shield className="h-10 w-10 text-[#FF7F3E]" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FF7F3E]/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-[#d95720]">
            <Lock className="h-3.5 w-3.5" />
            <span>Protected Page</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#003285] dark:text-white leading-tight">
            {defaultTitle}
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
            {defaultDescription}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-2">
          <Button
            asChild
            size="lg"
            className="w-full bg-[#003285] hover:bg-[#002561] text-white font-bold rounded-full py-6 text-base shadow-lg shadow-[#003285]/20"
          >
            <Link href={`/sign-in?redirect_url=${redirectUrl}`}>
              <LogIn className="mr-2 h-5 w-5 text-[#FFDA78]" />
              {t("auth.signIn")}
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full border-slate-300 dark:border-slate-700 text-[#003285] dark:text-white font-bold rounded-full py-6 text-base hover:bg-slate-50"
          >
            <Link href="/join">
              <UserPlus className="mr-2 h-5 w-5 text-[#FF7F3E]" />
              {t("nav.join")}
            </Link>
          </Button>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-between text-xs font-bold text-slate-400">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-[#003285] dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Return to Homepage
          </Link>
          <span>Samta Sainik Dal</span>
        </div>
      </div>
    </div>
  );
}
