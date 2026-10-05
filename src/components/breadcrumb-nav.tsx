"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/**
 * Mapping of URL path segments to their corresponding translation keys in LanguageContext.
 */
const SEGMENT_TRANSLATION_KEYS: Record<string, string> = {
  about: "nav.about",
  history: "nav.history",
  articles: "nav.articles",
  blog: "nav.blogs",
  news: "nav.news",
  events: "nav.events",
  gallery: "nav.gallery",
  join: "nav.join",
  contact: "nav.contact",
  dashboard: "nav.dashboard",
  "rank-structure": "nav.rankStructure",
  "national-executive": "nav.nationalOffice",
  "sign-in": "nav.signIn",
  "sign-up": "nav.signUp",
  donate: "footer.donate",
  privacy: "footer.privacy",
  terms: "footer.terms",
  faq: "footer.faq",
};

/**
 * Static fallback labels when translation keys are missing.
 */
const STATIC_FALLBACKS: Record<string, string> = {
  donate: "Donate",
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  faq: "FAQ",
};

/**
 * Formats unknown URL segments: decodes URI components, replaces hyphens with spaces,
 * and capitalizes each word.
 */
function formatSegment(segment: string): string {
  try {
    const decoded = decodeURIComponent(segment);
    return decoded
      .split("-")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } catch {
    return segment
      .split("-")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
}

/**
 * Resolves a human-readable, bilingual label for a given path segment.
 */
function getSegmentLabel(segment: string, t: (key: string) => string): string {
  const normalized = segment.toLowerCase();
  const translationKey = SEGMENT_TRANSLATION_KEYS[normalized];

  if (translationKey) {
    const translated = t(translationKey);
    // If translation key resolves to an actual translation string (not returning the key itself)
    if (translated && translated !== translationKey) {
      return translated;
    }
  }

  if (STATIC_FALLBACKS[normalized]) {
    return STATIC_FALLBACKS[normalized];
  }

  return formatSegment(segment);
}

export interface BreadcrumbNavProps {
  className?: string;
  containerClassName?: string;
}

/**
 * Auto-generating breadcrumb navigation component that builds breadcrumb items
 * from the current URL pathname with bilingual localization support.
 */
export function BreadcrumbNav({ className, containerClassName }: BreadcrumbNavProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  // Do not render breadcrumbs on the home page ("/")
  if (!pathname || pathname === "/") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  const homeLabel = t("nav.home") !== "nav.home" ? t("nav.home") : "Home";

  return (
    <div className={cn("container py-3 sm:py-4", containerClassName)}>
      <Breadcrumb className={className}>
        <BreadcrumbList>
          {/* Root / Home link */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">{homeLabel}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* Dynamic segments */}
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            const href = `/${segments.slice(0, index + 1).join("/")}`;
            const label = getSegmentLabel(segment, t);

            return (
              <React.Fragment key={href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
