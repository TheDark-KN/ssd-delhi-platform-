"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { MaterialIcon } from "@/components/ui/material-icon";
import { useLanguage } from "@/context/LanguageContext";

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "YouTube", href: "#", icon: Youtube },
];

const footerLinks = {
  organization: [
    { name: "footer.about", href: "/about" },
    { name: "footer.history", href: "/history" },
    { name: "footer.ideology", href: "/about#ideology" },
    { name: "footer.structure", href: "/about#structure" },
  ],
  content: [
    { name: "footer.articles", href: "/articles" },
    { name: "footer.blogs", href: "/blog" },
    { name: "footer.news", href: "/news" },
    { name: "footer.events", href: "/events" },
    { name: "footer.gallery", href: "/gallery" },
  ],
  community: [
    { name: "footer.join", href: "/join" },
    { name: "footer.membership", href: "/dashboard" },
    { name: "footer.volunteer", href: "/join" },
    { name: "footer.donate", href: "/donate" },
  ],
  support: [
    { name: "footer.contact", href: "/contact" },
    { name: "footer.faq", href: "/faq" },
    { name: "footer.privacy", href: "/privacy" },
    { name: "footer.terms", href: "/terms" },
  ],
};

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="border-t bg-forest text-cream">
      <div className="container py-10 sm:py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white shadow-lg overflow-hidden">
                <Image src="/logo.png" alt="SSD Logo" width={48} height={48} className="object-contain" />
              </div>
              <div>
                <h3 className="font-serif text-xl tracking-tight text-cream">{t("footer.brand")}</h3>
                <p className="text-xs text-blue-200/80 font-medium tracking-widest uppercase">समता सैनिक दल</p>
              </div>
            </div>
            <p className="text-sm text-blue-100/90 leading-relaxed">
              {t("footer.tagline")}
            </p>
            <p className="text-xs text-blue-200/70 italic">
              {t("footer.founded")}
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex size-10 items-center justify-center rounded-full bg-forest/60 text-cream/80 transition-all duration-300 hover:bg-saffron hover:text-forest"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Organization Links */}
          <div>
            <h4 className="font-semibold mb-6 text-[#FFDA78] uppercase tracking-wider text-xs">{t("footer.organization")}</h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.organization.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-blue-100/80 hover:text-[#FFDA78] transition-colors"
                  >
                    {t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Links */}
          <div>
            <h4 className="font-semibold mb-6 text-[#FFDA78] uppercase tracking-wider text-xs">{t("footer.content")}</h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.content.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-blue-100/80 hover:text-[#FFDA78] transition-colors"
                  >
                    {t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-6 text-[#FFDA78] uppercase tracking-wider text-xs">{t("footer.support")}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="mt-1 h-8 w-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-blue-900/50">
                  <MaterialIcon icon="location_on" variant="rounded" className="text-[20px] text-[#FFDA78]" />
                </div>
                <span className="text-blue-100/80 leading-relaxed">
                  {t("footer.address")}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-8 w-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-blue-900/50">
                  <MaterialIcon icon="mail" variant="rounded" className="text-[20px] text-[#FFDA78]" />
                </div>
                <a href="mailto:info@ssddelhi.org" className="text-blue-100/80 hover:text-white transition-colors">
                  {t("footer.email")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-8 w-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-blue-900/50">
                  <MaterialIcon icon="call" variant="rounded" className="text-[20px] text-[#FFDA78]" />
                </div>
                <a href="tel:+911112345678" className="text-blue-100/80 hover:text-white transition-colors">
                  {t("footer.phone")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/10 pt-6 sm:mt-12 sm:pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-xs text-blue-200/60 text-center md:text-left">
              {t("footer.copyright").replace("{year}", new Date().getFullYear().toString())}
            </p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-medium text-cream/60 md:justify-end">
              <Link href="/privacy" className="hover:text-[#FFDA78] transition-colors uppercase tracking-widest">
                {t("footer.privacy")}
              </Link>
              <Link href="/terms" className="hover:text-[#FFDA78] transition-colors uppercase tracking-widest">
                {t("footer.terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
