"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, BookOpen, UserPlus, Mail, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface NavItemConfig {
  key: string;
  href: string;
  icon: LucideIcon;
  activeMatch: (pathname: string) => boolean;
}

const NAV_ITEMS: NavItemConfig[] = [
  {
    key: "nav.home",
    href: "/",
    icon: Home,
    activeMatch: (pathname) => pathname === "/",
  },
  {
    key: "nav.about",
    href: "/about",
    icon: Info,
    activeMatch: (pathname) =>
      pathname.startsWith("/about") ||
      pathname.startsWith("/rank-structure") ||
      pathname.startsWith("/national-executive"),
  },
  {
    key: "nav.content",
    href: "/articles",
    icon: BookOpen,
    activeMatch: (pathname) =>
      pathname.startsWith("/articles") ||
      pathname.startsWith("/blog") ||
      pathname.startsWith("/news") ||
      pathname.startsWith("/events") ||
      pathname.startsWith("/gallery"),
  },
  {
    key: "nav.join",
    href: "/join",
    icon: UserPlus,
    activeMatch: (pathname) => pathname.startsWith("/join"),
  },
  {
    key: "nav.contact",
    href: "/contact",
    icon: Mail,
    activeMatch: (pathname) => pathname.startsWith("/contact"),
  },
];

export type BottomNavProps = React.ComponentProps<"nav">;

export function BottomNav({ className, ...props }: BottomNavProps) {
  const pathname = usePathname() || "/";
  const { t } = useLanguage();

  return (
    <nav
      data-slot="bottom-nav"
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t bg-background/95 backdrop-blur-md shadow-[0_-2px_10px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]",
        className
      )}
      {...props}
    >
      <div className="grid grid-cols-5 items-center w-full max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = item.activeMatch(pathname);
          const Icon = item.icon;
          const label = t(item.key);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-col items-center justify-center min-h-[44px] py-2 px-1 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 mb-1 shrink-0 transition-transform duration-150",
                  isActive && "scale-105"
                )}
                strokeWidth={isActive ? 2.5 : 2}
                aria-hidden="true"
              />
              <span className="text-[10px] leading-tight truncate max-w-full">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
