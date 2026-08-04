"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { Search, MapPin, X } from "lucide-react";
import { nationalOfficersEn } from "@/data/national-officers-en";

function initials(name: string) {
  return name.replace(/^मा०\s*/, "").split(/\s+/).slice(0, 2).map((part) => part[0]).join("");
}

// Generate dicebear avatar URL based on name
function getAvatarUrl(name: string): string {
  const seed = encodeURIComponent(name.trim().toLowerCase());
  // Using "avataaars" style - clean, professional avatars
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=003285,2A629A,FF7F3E,FFDA78`;
}

type Officer = {
  _id: string;
  _creationTime: number;
  name: string;
  nameEn?: string;
  designation: string;
  designationEn?: string;
  state: string;
  stateEn?: string;
  displayOrder: number;
  isActive: boolean;
  photoStorageId?: string;
};

const staticOfficers: Officer[] = nationalOfficersEn.map((o, i) => ({
  _id: `static-${i}`,
  _creationTime: Date.now(),
  name: o.name,
  nameEn: o.name,
  designation: o.designation,
  designationEn: o.designation,
  state: o.state,
  stateEn: o.state,
  displayOrder: o.displayOrder,
  isActive: true,
  photoStorageId: undefined,
}));

export function NationalOfficerDirectory() {
  const [search, setSearch] = useState("");
  const [state, setState] = useState("All States");
  const [officers, setOfficers] = useState<Officer[]>(staticOfficers);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const timeout = setTimeout(() => {
      if (mounted && isLoading) {
        setOfficers(staticOfficers);
        setIsLoading(false);
      }
    }, 1000);

    // Immediately use static data
    setOfficers(staticOfficers);
    setIsLoading(false);

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, []);

  const states = useMemo(() => ["All States", ...Array.from(new Set(officers.map((officer) => officer.stateEn || officer.state)))], [officers]);
  const filteredOfficers = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("en-US");
    return officers.filter((officer) => {
      const name = officer.nameEn || officer.name;
      const designation = officer.designationEn || officer.designation;
      const officerState = officer.stateEn || officer.state;
      const matchesSearch = !term || `${name} ${designation} ${officerState}`.toLocaleLowerCase("en-US").includes(term);
      return matchesSearch && (state === "All States" || officerState === state);
    });
  }, [search, state, officers]);

  return (
    <section className="relative -mt-10 rounded-t-[40px] bg-white px-4 py-12 md:-mt-16 md:rounded-t-[72px] md:px-6 md:py-20">
      <div className="container">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-[0.24em] text-[#FF7F3E]">National Executive</p>
            <h2 className="text-3xl font-black tracking-tight text-[#003285] md:text-5xl">Office Bearers List</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">National-level office bearers of Samta Sainik Dal. Each card has space reserved for adding photos.</p>
          </div>
          <div className="rounded-2xl bg-[#003285] px-5 py-3 text-white shadow-lg shadow-[#003285]/15">
            <span className="block text-2xl font-black">{officers.length}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-100">Officers</span>
          </div>
        </div>

        <div className="mb-10 grid gap-3 md:grid-cols-[1fr_220px]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#2A629A]" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, designation or state…" className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-10 text-base outline-none transition focus:border-[#2A629A] focus:bg-white focus:ring-4 focus:ring-[#2A629A]/10" />
            {search && <button aria-label="Clear search" onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-200"><X className="h-4 w-4" /></button>}
          </label>
          <select value={state} onChange={(event) => setState(event.target.value)} className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-[#003285] outline-none focus:border-[#2A629A] focus:ring-4 focus:ring-[#2A629A]/10">
            {states.map((option) => <option key={option}>{option}</option>)}
          </select>
        </div>

        {isLoading ? (
          <div className="rounded-3xl bg-slate-50 py-20 text-center text-slate-500">Loading officers…</div>
        ) : filteredOfficers.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredOfficers.map((officer) => (
              <article key={officer._id} className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2A629A]/40 hover:shadow-xl">
                <div className="h-1.5 bg-gradient-to-r from-[#003285] via-[#2A629A] to-[#FF7F3E]" />
                <div className="p-5">
                  <div className="mb-5 flex justify-center">
                    <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white shadow-lg ring-1 ring-slate-200">
                      {officer.photoStorageId ? (
                        <Image src={`/api/storage/${officer.photoStorageId}`} alt={`${officer.nameEn || officer.name}'s photo`} fill className="object-cover" sizes="112px" />
                      ) : (
                        <Image
                          src={getAvatarUrl(officer.nameEn || officer.name)}
                          alt={`${officer.nameEn || officer.name}'s avatar`}
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="min-h-12 text-lg font-black leading-snug text-[#003285]">{officer.nameEn || officer.name}</h3>
                    <p className="mt-2 inline-flex min-h-8 items-center rounded-full bg-[#FF7F3E]/10 px-3 py-1 text-sm font-bold text-[#d95720]">{officer.designationEn || officer.designation}</p>
                    <div className="mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold text-slate-500"><MapPin className="h-4 w-4 text-[#2A629A]" />{officer.stateEn || officer.state}</div>
                  </div>
                </div>
                <div className="border-t border-slate-100 px-5 py-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Samta Sainik Dal • National Executive</div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-slate-50 py-20 text-center text-slate-500">No officers found.</div>
        )}
      </div>
    </section>
  );
}