"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Shield } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@/components/providers";
import { useLanguage } from "@/context/LanguageContext";

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

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // Handle scroll effect and mount
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 border-b",
      scrolled
        ? "bg-background/98 backdrop-blur-md shadow-lg border-primary/20"
        : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    )}>
      <div className="container flex h-20 items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white shadow-lg group-hover:shadow-white/40 group-hover:scale-105 transition-all duration-300 overflow-hidden">
            <Image src="/logo.png" alt="SSD Logo" width={48} height={48} className="object-contain" priority />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-[#003285]">
              SSD Delhi
            </span>
            <span className="text-[10px] text-[#2A629A] font-bold tracking-[0.2em] uppercase">
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
                                  "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary",
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
                      "font-semibold text-xs uppercase tracking-widest text-[#2A629A] hover:text-[#003285] transition-colors",
                      pathname === item.href && "text-[#003285] font-bold"
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
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="hidden md:flex hover:bg-primary/10 hover:text-primary items-center justify-center p-0"
            aria-label={t("common.language")}
          >
            <MaterialIcon icon="language" variant="rounded" className="text-[22px]" />
            <span className="sr-only">{t("common.language")}</span>
          </Button>

          {/* Divider */}
          <div className="hidden md:block h-6 w-px bg-border" />

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {mounted && <AuthButtons />}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <div className="container py-4 space-y-1">
            {mainNavItems.map((item) => (
              <div key={item.title}>
                {item.items ? (
                  <div className="space-y-1">
                    <div className="font-semibold text-primary px-3 py-2">{t(item.title)}</div>
                    <div className="pl-4 space-y-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {t(subItem.title)}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-2 font-semibold hover:bg-muted rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(item.title)}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 mt-4 border-t flex items-center gap-2 px-3">
              {mounted && <AuthButtons />}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// Separate component for auth buttons to ensure proper Clerk context
function AuthButtons() {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="font-medium">Sign In</Button>
      </div>
    );
  }

  return (
    <>
      <SignedOut>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="font-semibold text-xs uppercase tracking-widest text-[#2A629A] hover:text-[#003285]">
            <Link href="/sign-in">{t("nav.signIn")}</Link>
          </Button>
          <Button variant="default" size="sm" asChild className="bg-[#FF7F3E] hover:bg-[#d95720] font-semibold text-xs uppercase tracking-widest rounded-full px-5 text-white shadow-md shadow-[#FF7F3E]/20 hover:scale-105 transition-all">
            <Link href="/sign-up">{t("nav.signUp")}</Link>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="font-semibold text-xs uppercase tracking-widest text-[#2A629A] hover:text-[#003285]">
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
