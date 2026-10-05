"use client";

import { BottomNav } from "@/components/bottom-nav";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { FAB } from "@/components/ui/fab";
import { BottomSheet } from "@/components/ui/bottom-sheet";

/**
 * Client-side mobile enhancements wrapper.
 * Groups all mobile-only UI features (bottom nav, FAB, bottom sheet, breadcrumbs)
 * into a single client boundary for the server-rendered layout.
 */
export function MobileEnhancements() {
  return (
    <>
      <BottomNav />
      <FAB />
      <BottomSheet />
    </>
  );
}

/**
 * Breadcrumb navigation rendered below the header on all deep pages.
 * Automatically hidden on the home page.
 */
export function PageBreadcrumbs() {
  return <BreadcrumbNav />;
}
