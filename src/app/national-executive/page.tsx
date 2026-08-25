import type { Metadata } from "next";
import { NationalOfficerDirectory } from "@/components/national-officer-directory";
import { listOfficers } from "@/lib/supabase-rest";

export const metadata: Metadata = { title: "National Executive | Samta Sainik Dal Delhi", description: "Meet the national office bearers of Samta Sainik Dal Delhi." };

export default async function NationalExecutivePage() {
  const officers = await listOfficers();
  return <main className="min-h-screen bg-muted/30"><section className="bg-primary px-4 pb-28 pt-20 text-primary-foreground md:px-6 md:pb-40 md:pt-28"><div className="container"><p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-accent">Samta Sainik Dal</p><h1 className="max-w-4xl text-balance text-4xl font-black leading-tight tracking-tight md:text-7xl">National Executive <span className="text-accent">/ Office Bearers</span></h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/75 md:text-xl">Meet the national leadership serving the movement with purpose, dignity, and commitment.</p></div></section><NationalOfficerDirectory officers={officers} /></main>;
}
