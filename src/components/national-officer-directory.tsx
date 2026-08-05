"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { Search, MapPin, X } from "lucide-react";
import { nationalOfficersEn } from "@/data/national-officers-en";
import { useLanguage } from "@/context/LanguageContext";

function initials(name: string) {
  return name.replace(/^मा०\s*/, "").split(/\s+/).slice(0, 2).map((part) => part[0]).join("");
}

type Officer = {
  _id: string;
  _creationTime: number;
  name: string;
  nameEn?: string;
  nameHi?: string;
  designation: string;
  designationEn?: string;
  designationHi?: string;
  state: string;
  stateEn?: string;
  stateHi?: string;
  displayOrder: number;
  isActive: boolean;
  photoStorageId?: string;
};

const stateTranslation: Record<string, { en: string; hi: string }> = {
  "Uttar Pradesh": { en: "Uttar Pradesh", hi: "उत्तर प्रदेश" },
  "Delhi": { en: "Delhi", hi: "दिल्ली" },
  "Rajasthan": { en: "Rajasthan", hi: "राजस्थान" },
  "Himachal Pradesh": { en: "Himachal Pradesh", hi: "हिमाचल प्रदेश" },
  "Madhya Pradesh": { en: "Madhya Pradesh", hi: "मध्य प्रदेश" },
  "Gujarat": { en: "Gujarat", hi: "गुजरात" },
  "Bihar": { en: "Bihar", hi: "बिहार" },
  "Madhya Pradesh/Chhattisgarh": { en: "Madhya Pradesh/Chhattisgarh", hi: "म.प्र./छ.ग." },
  "उत्तर प्रदेश": { en: "Uttar Pradesh", hi: "उत्तर प्रदेश" },
  "दिल्ली": { en: "Delhi", hi: "दिल्ली" },
  "राजस्थान": { en: "Rajasthan", hi: "राजस्थान" },
  "हिमाचल प्रदेश": { en: "Himachal Pradesh", hi: "हिमाचल प्रदेश" },
  "मध्य प्रदेश": { en: "Madhya Pradesh", hi: "मध्य प्रदेश" },
  "गुजरात": { en: "Gujarat", hi: "गुजरात" },
  "बिहार": { en: "Bihar", hi: "बिहार" },
  "म.प्र./छ.ग.": { en: "Madhya Pradesh/Chhattisgarh", hi: "म.प्र./छ.ग." },
};

const staticOfficers: Officer[] = nationalOfficersEn.map((o, i) => ({
  _id: `static-${i}`,
  _creationTime: Date.now(),
  name: o.name,
  nameEn: o.name,
  nameHi: o.name,
  designation: o.designation,
  designationEn: o.designation,
  designationHi: o.designation,
  state: o.state,
  stateEn: o.state,
  stateHi: o.state,
  displayOrder: o.displayOrder,
  isActive: true,
  photoStorageId: undefined,
}));

const DEFAULT_AVATAR = "/officer-avatar.png";

export function NationalOfficerDirectory() {
  const { language, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState(t("nationalExecutive.allStates"));
  const [officers, setOfficers] = useState<Officer[]>(staticOfficers);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setOfficers(staticOfficers);
    setIsLoading(false);
  }, []);

  const getStateName = (officer: Officer) => {
    if (language === "hi" && officer.stateHi) return officer.stateHi;
    if (language === "en" && officer.stateEn) return officer.stateEn;
    const translated = stateTranslation[officer.state] || stateTranslation[officer.stateEn || ""] || stateTranslation[officer.stateHi || ""];
    return translated ? translated[language] : officer.state;
  };

  const getDesignation = (officer: Officer) => {
    if (language === "hi" && officer.designationHi) return officer.designationHi;
    if (language === "en" && officer.designationEn) return officer.designationEn;
    return officer.designation;
  };

  const getName = (officer: Officer) => {
    if (language === "hi" && officer.nameHi) return officer.nameHi;
    if (language === "en" && officer.nameEn) return officer.nameEn;
    return officer.name;
  };

  const states = useMemo(() => {
    const uniqueStates = Array.from(new Set(officers.map((officer) => getStateName(officer))));
    return [t("nationalExecutive.allStates"), ...uniqueStates];
  }, [officers, language]);

  const filteredOfficers = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    return officers.filter((officer) => {
      const name = getName(officer);
      const designation = getDesignation(officer);
      const officerState = getStateName(officer);
      const matchesSearch = !term || `${name} ${designation} ${officerState}`.toLocaleLowerCase().includes(term);
      return matchesSearch && (stateFilter === t("nationalExecutive.allStates") || officerState === stateFilter);
    });
  }, [search, stateFilter, officers, language]);

  return (
    <section className="relative -mt-10 rounded-t-[40px] bg-white px-4 py-12 md:-mt-16 md:rounded-t-[72px] md:px-6 md:py-20">
      <div className="container">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-[0.24em] text-[#FF7F3E]">{t("nationalExecutive.title")}</p>
            <h2 className="text-3xl font-black tracking-tight text-[#003285] md:text-5xl">{t("nationalExecutive.subtitle")}</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">{t("nationalExecutive.description")}</p>
          </div>
          <div className="rounded-2xl bg-[#003285] px-5 py-3 text-white shadow-lg shadow-[#003285]/15">
            <span className="block text-2xl font-black">{officers.length}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-100">{t("nationalExecutive.officersCount")}</span>
          </div>
        </div>

        <div className="mb-10 grid gap-3 md:grid-cols-[1fr_220px]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#2A629A]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("nationalExecutive.searchPlaceholder")}
              className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-10 text-base outline-none transition focus:border-[#2A629A] focus:bg-white focus:ring-4 focus:ring-[#2A629A]/10"
            />
            {search && (
              <button
                aria-label={t("nationalExecutive.clearSearch")}
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
          <select
            value={stateFilter}
            onChange={(event) => setStateFilter(event.target.value)}
            className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-[#003285] outline-none focus:border-[#2A629A] focus:ring-4 focus:ring-[#2A629A]/10"
          >
            {states.map((option) => <option key={option}>{option}</option>)}
          </select>
        </div>

        {isLoading ? (
          <div className="rounded-3xl bg-slate-50 py-20 text-center text-slate-500">{t("nationalExecutive.loading")}</div>
        ) : filteredOfficers.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredOfficers.map((officer) => (
              <article key={officer._id} className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2A629A]/40 hover:shadow-xl">
                <div className="h-1.5 bg-gradient-to-r from-[#003285] via-[#2A629A] to-[#FF7F3E]" />
                <div className="p-5">
                  <div className="mb-5 flex justify-center">
                    <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white shadow-lg ring-1 ring-slate-200 bg-slate-100">
                      {officer.photoStorageId ? (
                        <Image src={`/api/storage/${officer.photoStorageId}`} alt={`${getName(officer)}'s photo`} fill className="object-cover" sizes="112px" />
                      ) : (
                        <Image
                          src={DEFAULT_AVATAR}
                          alt={`${getName(officer)}'s avatar`}
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="min-h-12 text-lg font-black leading-snug text-[#003285]">{getName(officer)}</h3>
                    <p className="mt-2 inline-flex min-h-8 items-center rounded-full bg-[#FF7F3E]/10 px-3 py-1 text-sm font-bold text-[#d95720]">{getDesignation(officer)}</p>
                    <div className="mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold text-slate-500"><MapPin className="h-4 w-4 text-[#2A629A]" />{getStateName(officer)}</div>
                  </div>
                </div>
                <div className="border-t border-slate-100 px-5 py-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t("nationalExecutive.footer")}</div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-slate-50 py-20 text-center text-slate-500">{t("nationalExecutive.noResults")}</div>
        )}
      </div>
    </section>
  );
}