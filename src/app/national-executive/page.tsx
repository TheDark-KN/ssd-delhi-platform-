import type { Metadata } from "next";
import { Shield, Users } from "lucide-react";
import { NationalOfficerDirectory } from "@/components/national-officer-directory";

export const metadata: Metadata = {
  title: "राष्ट्रीय कार्यकारिणी | समता सैनिक दल",
  description: "समता सैनिक दल की राष्ट्रीय कार्यकारिणी और पदाधिकारी सूची।",
};

export default function NationalExecutivePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-[#003285] px-4 pb-28 pt-20 text-white md:px-6 md:pb-40 md:pt-28">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#FF7F3E]/20 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#2A629A]/40 blur-3xl" />
        <div className="container relative">
          <div className="max-w-4xl">
            <div className="mb-7 flex items-center gap-3 text-[#FFDA78]"><Shield className="h-6 w-6" /><span className="text-sm font-black uppercase tracking-[0.24em]">समता सैनिक दल</span></div>
            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-7xl">राष्ट्रीय कार्यकारिणी <span className="text-[#FFDA78]">/ पदाधिकारी सूची</span></h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-blue-100 md:text-xl">समानता, स्वतंत्रता और बंधुत्व के लिए समर्पित राष्ट्रीय नेतृत्व से परिचय।</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-blue-100"><span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2"><Users className="h-4 w-4 text-[#FFDA78]" />राष्ट्रीय नेतृत्व</span><span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">फोटो जल्द जोड़े जाएंगे</span></div>
          </div>
        </div>
      </section>
      <NationalOfficerDirectory />
    </div>
  );
}
