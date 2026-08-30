"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@/components/providers";
import { useLanguage } from "@/context/LanguageContext";

const nav = [
  { label:"Home", href:"/" }, { label:"About", href:"/about" }, { label:"History", href:"/history" },
  { label:"Articles", href:"/articles" }, { label:"News", href:"/news" }, { label:"Officers", href:"/national-executive" }, { label:"Events", href:"/events" }, { label:"Gallery", href:"/gallery" },
];

export function Header() {
  const pathname = usePathname(); const { t } = useLanguage();
  const [open,setOpen] = useState(false); const [scrolled,setScrolled] = useState(false);
  useEffect(() => { const onScroll=()=>setScrolled(window.scrollY>8); onScroll(); window.addEventListener("scroll",onScroll); return()=>window.removeEventListener("scroll",onScroll); },[]);
  useEffect(() => { setOpen(false); }, [pathname]);
  const solid = scrolled || pathname !== "/";
  return <header className={cn("fixed inset-x-0 top-0 z-50 border-b transition-all duration-300", solid ? "border-border bg-background/95 backdrop-blur" : "border-transparent bg-blue-deep/20 text-paper")}>
    <div className="container flex min-h-20 items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-3" aria-label="SSD Delhi home"><Image src="/logo.svg" alt="Samta Sainik Dal Delhi" width={52} height={52} className="size-11 rounded-full object-cover" priority /><span><span className="block font-serif text-xl leading-none">SSD Delhi</span><span className={cn("mt-1 block text-[10px] font-semibold uppercase tracking-[.18em]", solid ? "text-saffron" : "text-paper/70")}>समता सैनिक दल</span></span></Link>
      <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">{nav.map(item=><Link key={item.href} href={item.href} className={cn("rounded-full px-4 py-2 text-sm font-medium", solid ? "text-foreground/75 hover:bg-secondary hover:text-blue" : "text-paper/85 hover:bg-paper/10 hover:text-paper", pathname===item.href && (solid ? "bg-secondary text-blue" : "bg-paper/10 text-paper"))}>{item.label}</Link>)}</nav>
      <div className="hidden items-center gap-3 lg:flex"><Link href="/contact" className={cn("text-sm font-medium", solid ? "text-foreground/70 hover:text-blue" : "text-paper/80 hover:text-paper")}>Contact</Link><Button asChild className="rounded-full bg-saffron px-5 text-paper hover:bg-saffron/90"><Link href="/join">Become a Member</Link></Button><SignedOut><Link href="/sign-in" className="text-sm">{t("nav.signIn")}</Link></SignedOut><SignedIn><UserButton afterSignOutUrl="/" /></SignedIn></div>
      <Button variant="ghost" size="icon" className={cn("lg:hidden", solid ? "text-foreground" : "text-paper")} onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>{open?<X />:<Menu />}</Button>
    </div>
    {open && <div className="border-t border-border bg-background lg:hidden"><nav className="container flex flex-col gap-1 py-4" aria-label="Mobile navigation">{nav.map(item=><Link key={item.href} href={item.href} className={cn("rounded-md px-3 py-3 text-base text-foreground", pathname===item.href ? "bg-secondary font-semibold text-blue" : "hover:bg-secondary")}>{item.label}</Link>)}<div className="mt-3 flex gap-3 border-t border-border pt-4"><Button asChild className="rounded-full bg-saffron text-paper"><Link href="/join">Become a Member</Link></Button><Link href="/contact" className="rounded-full border border-border px-4 py-2 text-sm">Contact</Link></div></nav></div>}
  </header>;
}
