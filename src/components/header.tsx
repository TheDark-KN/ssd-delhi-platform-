"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@/components/providers";
import { useLanguage } from "@/context/LanguageContext";

// ─── Nav data ─────────────────────────────────────────────────────────
const mainNavItems = [
  {
    title: "nav.home",
    href: "/",
  },
  {
    title: "nav.about",
    href: "/about",
    items: [
      { title: "nav.organization", href: "/about#organization" },
      { title: "nav.ideology", href: "/about#ideology" },
      { title: "nav.structure", href: "/about#structure" },
      { title: "nav.rankStructure", href: "/rank-structure" },
      { title: "nav.nationalExecutive", href: "/national-executive" },
      { title: "nav.ambedkar", href: "/about#ambedkar" },
    ],
  },
  {
    title: "nav.history",
    href: "/history",
  },
  {
    title: "nav.content",
    items: [
      { title: "nav.articles", href: "/articles" },
      { title: "nav.blogs", href: "/blog" },
      { title: "nav.news", href: "/news" },
      { title: "nav.events", href: "/events" },
      { title: "nav.gallery", href: "/gallery" },
    ],
  },
  {
    title: "nav.join",
    href: "/join",
  },
  {
    title: "nav.contact",
    href: "/contact",
  },
];

// ─── Session-persisted submenu state ──────────────────────────────────
const SUBMENU_STATE_KEY = "ssd-mobile-nav-open-submenus";

function getPersistedSubmenus(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(SUBMENU_STATE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function persistSubmenus(state: Record<string, boolean>) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SUBMENU_STATE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota errors
  }
}

// ─── CSS ripple keyframes (injected once) ─────────────────────────────
const RIPPLE_STYLE_ID = "ssd-ripple-style";
function ensureRippleStyle() {
  if (typeof document === "undefined") return;
  if (document.getElementById(RIPPLE_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = RIPPLE_STYLE_ID;
  style.textContent = `
    @keyframes ssd-ripple {
      0% { transform: scale(0); opacity: 0.4; }
      100% { transform: scale(4); opacity: 0; }
    }
    .ssd-ripple-container { position: relative; overflow: hidden; }
    .ssd-ripple-container .ssd-ripple-circle {
      position: absolute;
      border-radius: 50%;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      animation: ssd-ripple 0.6s ease-out;
    }
    @media (prefers-reduced-motion: reduce) {
      .ssd-ripple-container .ssd-ripple-circle { animation: none !important; }
    }
  `;
  document.head.appendChild(style);
}

function createRipple(e: React.MouseEvent | React.TouchEvent) {
  const target = e.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
  const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
  const size = Math.max(rect.width, rect.height);
  const circle = document.createElement("span");
  circle.className = "ssd-ripple-circle";
  circle.style.width = circle.style.height = `${size}px`;
  circle.style.left = `${clientX - rect.left - size / 2}px`;
  circle.style.top = `${clientY - rect.top - size / 2}px`;
  target.appendChild(circle);
  circle.addEventListener("animationend", () => circle.remove());
}

// ─── Swipe-to-close hook ──────────────────────────────────────────────
function useSwipeToClose(onClose: () => void, threshold = 80) {
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const isSwiping = useRef(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
    isSwiping.current = true;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    touchCurrentX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    const deltaX = touchStartX.current - touchCurrentX.current;
    // Swipe left to close (since drawer opens from left)
    if (deltaX > threshold) {
      onClose();
    }
  }, [onClose, threshold]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}

// ─── Mobile Nav Item ──────────────────────────────────────────────────
function MobileNavItem({
  item,
  pathname,
  t,
  isOpen,
  onToggle,
  onClose,
  isFocused,
}: {
  item: (typeof mainNavItems)[0];
  pathname: string;
  t: (key: string) => string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  isFocused: boolean;
}) {
  const isActive = item.href
    ? pathname === item.href
    : item.items?.some((sub) => pathname === sub.href || pathname.startsWith(sub.href.split("#")[0]));
  const itemRef = useRef<HTMLElement>(null);

  // Auto-focus when keyboard-navigated
  useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.focus();
    }
  }, [isFocused]);

  useEffect(() => {
    ensureRippleStyle();
  }, []);

  if (item.items) {
    return (
      <div className="group" role="none">
        <button
          ref={itemRef as React.RefObject<HTMLButtonElement>}
          onClick={(e) => {
            createRipple(e);
            onToggle();
          }}
          className={cn(
            "ssd-ripple-container flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-md min-h-[44px]",
            "motion-safe:transition-colors",
            isActive ? "text-primary bg-primary/5" : "text-foreground hover:bg-muted hover:text-foreground",
            isFocused && "ring-2 ring-primary/50 ring-offset-1"
          )}
          aria-expanded={isOpen}
          aria-haspopup="true"
          role="menuitem"
          tabIndex={isFocused ? 0 : -1}
        >
          <span>{t(item.title)}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground motion-safe:transition-transform motion-safe:duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
        {isOpen && (
          <div
            className="mt-1 ml-4 space-y-1 border-l border-border/50 pl-3 motion-safe:animate-in motion-safe:slide-in-from-top-2"
            role="menu"
            aria-label={t(item.title)}
          >
            {item.items.map((subItem) => (
              <Link
                key={subItem.href}
                href={subItem.href}
                onClick={onClose}
                role="menuitem"
                aria-current={pathname === subItem.href ? "page" : undefined}
                className={cn(
                  "block px-2 py-2 text-sm rounded-md min-h-[44px] flex items-center",
                  "motion-safe:transition-colors",
                  pathname === subItem.href
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {t(subItem.title)}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      ref={itemRef as React.RefObject<HTMLAnchorElement>}
      href={item.href!}
      onClick={(e) => {
        createRipple(e);
        onClose();
      }}
      role="menuitem"
      aria-current={isActive ? "page" : undefined}
      tabIndex={isFocused ? 0 : -1}
      className={cn(
        "ssd-ripple-container flex items-center px-3 py-2.5 text-sm font-medium rounded-md min-h-[44px]",
        "motion-safe:transition-colors",
        isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted hover:text-foreground",
        isFocused && "ring-2 ring-primary/50 ring-offset-1"
      )}
    >
      {t(item.title)}
    </Link>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // Keyboard navigation state for mobile menu
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Session-persisted submenu open states
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  // Restore submenu state on mount
  useEffect(() => {
    setMounted(true);
    setOpenSubmenus(getPersistedSubmenus());
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close handler for the mobile sheet
  const handleSheetClose = useCallback(() => {
    setSheetOpen(false);
    setFocusedIndex(-1);
  }, []);

  // Swipe-to-close
  const swipeHandlers = useSwipeToClose(handleSheetClose);

  // Toggle submenu with persistence
  const toggleSubmenu = useCallback((title: string) => {
    setOpenSubmenus((prev) => {
      const next = { ...prev, [title]: !prev[title] };
      persistSubmenus(next);
      return next;
    });
  }, []);

  // Keyboard navigation handler for the mobile nav
  const handleNavKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const itemCount = mainNavItems.length;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => (prev + 1) % itemCount);
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => (prev - 1 + itemCount) % itemCount);
          break;
        case "Home":
          e.preventDefault();
          setFocusedIndex(0);
          break;
        case "End":
          e.preventDefault();
          setFocusedIndex(itemCount - 1);
          break;
        case "Escape":
          handleSheetClose();
          break;
      }
    },
    [handleSheetClose]
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b",
        "motion-safe:transition-all motion-safe:duration-300",
        scrolled
          ? "bg-background/98 backdrop-blur-md shadow-sm border-forest/10"
          : "bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="container flex min-h-16 items-center justify-between gap-3 py-2 sm:min-h-20">
        {/* Logo Section */}
        <Link href="/" className="group flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-lg motion-safe:transition-all motion-safe:duration-300 group-hover:scale-105 group-hover:shadow-white/40 sm:size-12">
            <Image src="/logo.png" alt="SSD Logo" width={48} height={48} className="size-full object-contain" priority />
          </div>
          <div className="flex flex-col">
            <span className="truncate font-serif text-xl tracking-tight text-forest sm:text-2xl">
              SSD Delhi
            </span>
            <span className="text-[10px] text-saffron font-semibold tracking-[0.2em] uppercase">
              समता सैनिक दल
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {mainNavItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.items ? (
                  <>
                    <NavigationMenuTrigger className="font-medium text-sm uppercase tracking-wide">
                      {t(item.title)}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[220px] gap-1 p-3">
                        {item.items.map((subItem) => (
                          <li key={subItem.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={subItem.href}
                                className={cn(
                                  "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none",
                                  "motion-safe:transition-all motion-safe:duration-200",
                                  "hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary",
                                  pathname === subItem.href && "bg-primary/10 text-primary font-semibold"
                                )}
                              >
                                <div className="text-sm font-medium leading-none">
                                  {t(subItem.title)}
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink
                    asChild
                    href={item.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "font-semibold text-xs uppercase tracking-widest text-[#2A629A] hover:text-[#003285]",
                      "motion-safe:transition-colors",
                      pathname === item.href && "text-[#003285] font-bold",
                      // Active route indicator
                      pathname === item.href && "relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-4 after:rounded-full after:bg-primary"
                    )}
                  >
                    <Link href={item.href}>
                      {t(item.title)}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Language Toggle with Tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                className="hidden md:flex hover:bg-primary/10 hover:text-primary items-center justify-center p-0 min-h-[44px] min-w-[44px]"
                aria-label={`${t("common.language")}: ${language === "en" ? t("common.hindi") : t("common.english")}`}
              >
                <MaterialIcon icon="language" variant="rounded" className="text-[22px]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {language === "en" ? t("common.hindi") : t("common.english")}
            </TooltipContent>
          </Tooltip>

          {/* Divider */}
          <div className="hidden md:block h-6 w-px bg-border" />

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {mounted && <AuthButtons />}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden min-h-[44px] min-w-[44px]"
                aria-label={t("common.menu")}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-80 sm:w-[320px] p-0"
              {...swipeHandlers}
            >
              <SheetHeader className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-lg font-semibold text-foreground">
                    {t("common.navigation")}
                  </SheetTitle>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10 min-h-[44px] min-w-[44px]">
                      <X className="h-5 w-5" />
                      <span className="sr-only">{t("common.close")}</span>
                    </Button>
                  </SheetClose>
                </div>
                <SheetDescription className="text-xs mt-1">
                  {t("common.exploreAllPages")}
                </SheetDescription>
              </SheetHeader>

              {/* Mobile Language Toggle */}
              <div className="px-4 pt-3 pb-1 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                  className="text-xs gap-1.5 min-h-[44px]"
                  aria-label={t("common.language")}
                >
                  <MaterialIcon icon="language" variant="rounded" className="text-[16px]" />
                  {language === "en" ? "हिंदी" : "English"}
                </Button>
              </div>

              <ScrollArea className="flex-1 px-4 py-2">
                <nav
                  className="flex flex-col gap-1"
                  role="menu"
                  aria-label={t("common.navigation")}
                  onKeyDown={handleNavKeyDown}
                >
                  {mainNavItems.map((item, index) => (
                    <MobileNavItem
                      key={item.title}
                      item={item}
                      pathname={pathname}
                      t={t}
                      isOpen={!!openSubmenus[item.title]}
                      onToggle={() => toggleSubmenu(item.title)}
                      onClose={handleSheetClose}
                      isFocused={focusedIndex === index}
                    />
                  ))}
                </nav>
              </ScrollArea>
              <Separator className="mx-4" />
              <div className="px-4 py-4">
                {mounted && <AuthButtons />}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}

// ─── Auth Buttons ─────────────────────────────────────────────────────
function AuthButtons() {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="font-medium min-h-[44px]">Sign In</Button>
      </div>
    );
  }

  return (
    <>
      <SignedOut>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="font-semibold text-xs uppercase tracking-widest text-[#2A629A] hover:text-[#003285] min-h-[44px]">
            <Link href="/sign-in">{t("nav.signIn")}</Link>
          </Button>
          <Button variant="default" size="sm" asChild className="bg-[#FF7F3E] hover:bg-[#d95720] font-semibold text-xs uppercase tracking-widest rounded-full px-5 text-white shadow-md shadow-[#FF7F3E]/20 hover:scale-105 motion-safe:transition-all min-h-[44px]">
            <Link href="/sign-up">{t("nav.signUp")}</Link>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="font-semibold text-xs uppercase tracking-widest text-[#2A629A] hover:text-[#003285] min-h-[44px]">
            <Link href="/dashboard">{t("nav.dashboard")}</Link>
          </Button>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-9 w-9 ring-2 ring-primary/20 hover:ring-primary transition-all",
              }
            }}
          />
        </div>
      </SignedIn>
    </>
  );
}
