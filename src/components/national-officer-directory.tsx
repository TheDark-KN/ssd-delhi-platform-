"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Search, MapPin, UserRound, X } from "lucide-react";
import { nationalOfficers } from "@/data/national-officers";

function initials(name: string) {
  return name.replace(/^मा०\s*/, "").split(/\s+/).slice(0, 2).map((part) => part[0]).join("");
}

export function NationalOfficerDirectory() {
  const [search, setSearch] = useState("");
  const [state, setState] = useState("सभी राज्य");

  const states = useMemo(() => ["सभी राज्य", ...Array.from(new Set(nationalOfficers.map((officer) => officer.state)))], []);
  const filteredOfficers = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("hi-IN");
    return nationalOfficers.filter((officer) => {
      const matchesSearch = !term || `${officer.name} ${officer.designation} ${officer.state}`.toLocaleLowerCase("hi-IN").includes(term);
      return matchesSearch && (state === "सभी राज्य" || officer.state === state);
    });
  }, [search, state]);

  return (
    <section className="relative -mt-10 rounded-t-[40px] bg-white px-4 py-12 md:-mt-16 md:rounded-t-[72px] md:px-6 md:py-20">
      <div className="container">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-[0.24em] text-[#FF7F3E]">राष्ट्रीय कार्यकारिणी</p>
            <h2 className="text-3xl font-black tracking-tight text-[#003285] md:text-5xl">पदाधिकारी सूची</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">समता सैनिक दल के राष्ट्रीय स्तर के पदाधिकारी। प्रत्येक कार्ड में फोटो जोड़ने के लिए स्थान रखा गया है।</p>
          </div>
          <div className="rounded-2xl bg-[#003285] px-5 py-3 text-white shadow-lg shadow-[#003285]/15">
            <span className="block text-2xl font-black">{nationalOfficers.length}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-100">पदाधिकारी</span>
          </div>
        </div>

        <div className="mb-10 grid gap-3 md:grid-cols-[1fr_220px]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#2A629A]" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="नाम, पद या राज्य खोजें…" className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-10 text-base outline-none transition focus:border-[#2A629A] focus:bg-white focus:ring-4 focus:ring-[#2A629A]/10" />
            {search && <button aria-label="खोज साफ करें" onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-200"><X className="h-4 w-4" /></button>}
          </label>
          <select value={state} onChange={(event) => setState(event.target.value)} className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-[#003285] outline-none focus:border-[#2A629A] focus:ring-4 focus:ring-[#2A629A]/10">
            {states.map((option) => <option key={option}>{option}</option>)}
          </select>
        </div>

        {filteredOfficers.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredOfficers.map((officer) => (
              <article key={officer.id} className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2A629A]/40 hover:shadow-xl">
                <div className="h-1.5 bg-gradient-to-r from-[#003285] via-[#2A629A] to-[#FF7F3E]" />
                <div className="p-5">
                  <div className="mb-5 flex justify-center">
                    <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-[#003285] to-[#2A629A] text-3xl font-black text-[#FFDA78] shadow-lg ring-1 ring-slate-200">
                      {officer.photoPath ? <Image src={officer.photoPath} alt={`${officer.name} का फोटो`} fill className="object-cover" sizes="112px" /> : <><UserRound className="absolute h-10 w-10 text-white/20" /><span className="relative">{initials(officer.name)}</span></>}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="min-h-12 text-lg font-black leading-snug text-[#003285]">{officer.name}</h3>
                    <p className="mt-2 inline-flex min-h-8 items-center rounded-full bg-[#FF7F3E]/10 px-3 py-1 text-sm font-bold text-[#d95720]">{officer.designation}</p>
                    <div className="mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold text-slate-500"><MapPin className="h-4 w-4 text-[#2A629A]" />{officer.state}</div>
                  </div>
                </div>
                <div className="border-t border-slate-100 px-5 py-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">समता सैनिक दल • राष्ट्रीय कार्यकारिणी</div>
              </article>
            ))}
          </div>
        ) : <div className="rounded-3xl bg-slate-50 py-20 text-center text-slate-500">कोई पदाधिकारी नहीं मिला।</div>}
      </div>
    </section>
  );
}
