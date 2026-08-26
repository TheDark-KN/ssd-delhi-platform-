"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Search, Users, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { SupabaseOfficer } from "@/lib/supabase-rest";

export function NationalOfficerDirectory({ officers }: { officers: SupabaseOfficer[] }) {
  const [search, setSearch] = useState("");
  const [state, setState] = useState("All states");
  const states = useMemo(() => ["All states", ...Array.from(new Set(officers.map((officer) => officer.state))).sort()], [officers]);
  const filteredOfficers = useMemo(() => {
    const term = search.trim().toLowerCase();
    return officers.filter((officer) => (!term || `${officer.name} ${officer.designation} ${officer.state}`.toLowerCase().includes(term)) && (state === "All states" || officer.state === state));
  }, [officers, search, state]);

  return <section className="relative -mt-10 rounded-t-[40px] bg-background px-4 py-12 md:-mt-16 md:rounded-t-[72px] md:px-6 md:py-20">
    <div className="container">
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div><p className="mb-2 text-sm font-black uppercase tracking-[0.24em] text-accent">National Executive</p><h2 className="text-balance text-3xl font-black tracking-tight text-primary md:text-5xl">Office bearers</h2><p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">Meet the national office bearers serving Samta Sainik Dal across India.</p></div>
        <div className="flex items-center gap-3 rounded-2xl bg-primary px-5 py-3 text-primary-foreground shadow-lg"><Users className="h-5 w-5 text-accent" /><div><span className="block text-2xl font-black">{officers.length}</span><span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70">Office bearers</span></div></div>
      </div>
      <div className="mb-10 grid gap-3 md:grid-cols-[1fr_220px]"><label className="relative block"><span className="sr-only">Search officers</span><Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ring" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, role or state" className="h-14 w-full rounded-2xl border border-border bg-muted/40 pl-12 pr-10 text-base outline-none transition focus:border-ring focus:bg-background focus:ring-4 focus:ring-ring/10" />{search && <button type="button" aria-label="Clear search" onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-muted-foreground hover:bg-muted"><X className="h-4 w-4" /></button>}</label><select aria-label="Filter by state" value={state} onChange={(event) => setState(event.target.value)} className="h-14 rounded-2xl border border-border bg-muted/40 px-4 text-sm font-bold text-primary outline-none focus:border-ring focus:ring-4 focus:ring-ring/10">{states.map((option) => <option key={option}>{option}</option>)}</select></div>
      <p className="mb-5 text-sm font-semibold text-muted-foreground">Showing {filteredOfficers.length} of {officers.length} office bearers</p>
      {filteredOfficers.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filteredOfficers.map((officer) => <Link key={officer.id} href={`/national-executive/${officer.slug || officer.id}`} className="group block overflow-hidden rounded-[28px] border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:border-ring/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20"><div className="h-1.5 bg-accent" /><div className="p-5"><div className="mb-5 flex justify-center"><div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-card bg-muted shadow-lg ring-1 ring-border">{officer.photo_url ? <Image src={officer.photo_url} alt={`${officer.name} portrait`} fill className="object-cover" sizes="112px" /> : <span className="text-2xl font-black text-primary">{officer.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("")}</span>}</div></div><div className="text-center"><h3 className="min-h-12 text-lg font-black leading-snug text-primary">{officer.name}</h3><p className="mt-2 inline-flex min-h-8 items-center rounded-full bg-accent/10 px-3 py-1 text-sm font-bold text-accent-foreground">{officer.designation}</p><div className="mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold text-muted-foreground"><MapPin className="h-4 w-4 text-ring" />{officer.state}</div></div></div><div className="border-t border-border px-5 py-3 text-center text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">View officer profile</div></Link>)}</div> : <div className="rounded-3xl border border-dashed border-border bg-muted/30 py-20 text-center"><p className="font-bold text-primary">No office bearers found</p><p className="mt-2 text-sm text-muted-foreground">Try a different name or state.</p></div>}
    </div>
  </section>;
}
