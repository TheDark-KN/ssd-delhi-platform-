"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="relative">
      <button
        onClick={() => setLanguage(language === "en" ? "hi" : "en")}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-colors"
        aria-label={t("common.language")}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{language === "en" ? t("common.english") : t("common.hindi")}</span>
      </button>
    </div>
  );
}