import type { Metadata } from "next";
import { NationalOfficerDirectory } from "@/components/national-officer-directory";

export const metadata: Metadata = {
  title: "National Executive | Samta Sainik Dal Delhi",
  description: "National Executive and Office Bearers List of Samta Sainik Dal Delhi.",
};

export default function NationalExecutivePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-[#003285] px-4 pb-28 pt-20 text-white md:px-6 md:pb-40 md:pt-28">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#FF7F3E]/20 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#2A629A]/40 blur-3xl" />
        <div className="container relative">
          <div className="max-w-4xl">
            <div className="mb-7 flex items-center gap-3 text-[#FFDA78]">
              <span className="h-6 w-6" aria-hidden="true">🛡️</span>
              <span className="text-sm font-black uppercase tracking-[0.24em]">Samta Sainik Dal</span>
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-7xl">
              National Executive <span className="text-[#FFDA78]">/ Office Bearers List</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-blue-100 md:text-xl">
              National-level office bearers of Samta Sainik Dal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-blue-100">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
                <span className="h-4 w-4 text-[#FFDA78]" aria-hidden="true">👥</span>
                National Executive
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                Photos coming soon
              </span>
            </div>
          </div>
        </div>
      </section>
      <NationalOfficerDirectory />
    </div>
  );
}
