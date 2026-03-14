"use client";

import { useState } from "react";
import { Shield, ChevronDown, ChevronUp, Star, Award, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────
   SSD Rank Hierarchy Data — Based on official SSD structure
   ───────────────────────────────────────────────────────── */

interface RankInfo {
  cadreNo: number;
  titleHi: string;
  titleEn: string;
  shirt: string;
  pant: string;
  notes: string;
}

interface LevelGroup {
  level: string;
  levelHi: string;
  icon: React.ReactNode;
  color: string; // gradient from
  colorTo: string; // gradient to
  accentColor: string;
  ranks: RankInfo[];
}

const SSD_HIERARCHY: LevelGroup[] = [
  {
    level: "Central / National",
    levelHi: "केंद्र (Central/National)",
    icon: <Star className="w-6 h-6" />,
    color: "#003285",
    colorTo: "#001a3d",
    accentColor: "#FFDA78",
    ranks: [
      {
        cadreNo: 1,
        titleHi: "सुप्रीम कमांडर इन चीफ / सर्वोच्च सेनापति",
        titleEn: "Supreme Commander-in-Chief",
        shirt: "—",
        pant: "—",
        notes: "उच्चतम पद, संगठन का प्रमुख",
      },
      {
        cadreNo: 2,
        titleHi: "कमांडर इन चीफ",
        titleEn: "Commander-in-Chief",
        shirt: "खाकी / नीला",
        pant: "खाकी",
        notes: "राष्ट्रीय स्तर का मुख्य कमांडर",
      },
      {
        cadreNo: 3,
        titleHi: "डिप्टी कमांडर इन चीफ",
        titleEn: "Deputy Commander-in-Chief",
        shirt: "खाकी / नीला",
        pant: "खाकी",
        notes: "सहायक राष्ट्रीय कमांडर",
      },
      {
        cadreNo: 4,
        titleHi: "असिस्टेंट कमांडर इन चीफ",
        titleEn: "Assistant Commander-in-Chief",
        shirt: "खाकी",
        pant: "खाकी",
        notes: "सहायक स्तर",
      },
    ],
  },
  {
    level: "State / Provincial",
    levelHi: "प्रदेश (State/Provincial)",
    icon: <Award className="w-6 h-6" />,
    color: "#2A629A",
    colorTo: "#1a3f6b",
    accentColor: "#FF7F3E",
    ranks: [
      {
        cadreNo: 5,
        titleHi: "स्टेट कमांडर",
        titleEn: "State Commander",
        shirt: "खाकी",
        pant: "खाकी",
        notes: "प्रदेश स्तर का प्रमुख",
      },
      {
        cadreNo: 6,
        titleHi: "डिप्टी स्टेट कमांडर",
        titleEn: "Deputy State Commander",
        shirt: "खाकी",
        pant: "खाकी",
        notes: "उप-प्रदेश कमांडर",
      },
      {
        cadreNo: 7,
        titleHi: "असिस्टेंट स्टेट कमांडर",
        titleEn: "Assistant State Commander",
        shirt: "खाकी",
        pant: "खाकी",
        notes: "सहायक प्रदेश कमांडर",
      },
    ],
  },
  {
    level: "District",
    levelHi: "जिला (District)",
    icon: <Shield className="w-6 h-6" />,
    color: "#FF7F3E",
    colorTo: "#cc5a1e",
    accentColor: "#FFDA78",
    ranks: [
      {
        cadreNo: 8,
        titleHi: "डिस्ट्रिक्ट कमांडर",
        titleEn: "District Commander",
        shirt: "खाकी",
        pant: "खाकी",
        notes: "जिला स्तर का कमांडर",
      },
      {
        cadreNo: 9,
        titleHi: "डिप्टी डिस्ट्रिक्ट कमांडर",
        titleEn: "Deputy District Commander",
        shirt: "खाकी",
        pant: "खाकी",
        notes: "उप-जिला कमांडर",
      },
      {
        cadreNo: 10,
        titleHi: "असिस्टेंट डिस्ट्रिक्ट कमांडर",
        titleEn: "Assistant District Commander",
        shirt: "खाकी",
        pant: "खाकी",
        notes: "सहायक जिला कमांडर",
      },
    ],
  },
  {
    level: "Area / Tehsil",
    levelHi: "क्षेत्र (Area/Tehsil)",
    icon: <Zap className="w-6 h-6" />,
    color: "#FFDA78",
    colorTo: "#e6c35e",
    accentColor: "#003285",
    ranks: [
      {
        cadreNo: 11,
        titleHi: "एरिया कमांडर",
        titleEn: "Area Commander",
        shirt: "खाकी",
        pant: "खाकी",
        notes: "क्षेत्र / तहसील स्तर",
      },
      {
        cadreNo: 12,
        titleHi: "डिप्टी एरिया कमांडर",
        titleEn: "Deputy Area Commander",
        shirt: "खाकी",
        pant: "खाकी",
        notes: "उप-क्षेत्र कमांडर",
      },
      {
        cadreNo: 13,
        titleHi: "असिस्टेंट एरिया कमांडर",
        titleEn: "Assistant Area Commander",
        shirt: "खाकी",
        pant: "खाकी",
        notes: "सहायक क्षेत्र कमांडर",
      },
    ],
  },
  {
    level: "Unit / Sanghayan",
    levelHi: "संघायन (Unit/Local)",
    icon: <Users className="w-6 h-6" />,
    color: "#2A629A",
    colorTo: "#003285",
    accentColor: "#FFDA78",
    ranks: [
      {
        cadreNo: 14,
        titleHi: "संघायन कमांडर",
        titleEn: "Sanghayan Commander",
        shirt: "खाकी / सफेद",
        pant: "खाकी",
        notes: "यूनिट या लोकल कमांडर",
      },
      {
        cadreNo: 15,
        titleHi: "डिप्टी संघायन कमांडर",
        titleEn: "Deputy Sanghayan Commander",
        shirt: "—",
        pant: "—",
        notes: "उप-संघायन कमांडर",
      },
      {
        cadreNo: 16,
        titleHi: "असिस्टेंट संघायन कमांडर",
        titleEn: "Assistant Sanghayan Commander",
        shirt: "—",
        pant: "—",
        notes: "सहायक",
      },
    ],
  },
];

/* ────────────── Helper: single star rating by cadre ────────────── */
function RankStars({ cadreNo }: { cadreNo: number }) {
  // Fewer cadre == higher rank == more stars
  const starCount = cadreNo <= 4 ? 5 : cadreNo <= 7 ? 4 : cadreNo <= 10 ? 3 : cadreNo <= 13 ? 2 : 1;
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: starCount }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-current" />
      ))}
    </div>
  );
}

/* ─────────────── Expandable Level Card Component ─────────────── */
function LevelCard({ group, index, isOpen, toggle }: { group: LevelGroup; index: number; isOpen: boolean; toggle: () => void }) {
  return (
    <div
      className="group relative"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Connector line to next card */}
      {index < SSD_HIERARCHY.length - 1 && (
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-full w-px h-8 bg-gradient-to-b from-slate-300 to-transparent z-0" />
      )}

      <div
        className={cn(
          "relative overflow-hidden rounded-[28px] border-2 transition-all duration-500",
          isOpen
            ? "shadow-2xl border-transparent scale-[1.01]"
            : "shadow-lg border-slate-100 hover:shadow-xl hover:border-slate-200 hover:scale-[1.005]"
        )}
      >
        {/* Header / Toggle button */}
        <button
          onClick={toggle}
          className="w-full text-left relative z-10"
        >
          <div
            className="px-6 md:px-8 py-6 flex items-center gap-4 md:gap-6"
            style={{
              background: `linear-gradient(135deg, ${group.color}, ${group.colorTo})`,
            }}
          >
            {/* Cadre Number badge */}
            <div
              className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20"
              style={{ color: group.accentColor }}
            >
              {group.icon}
            </div>

            {/* Title */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-white/60">
                Level {index + 1}
              </p>
              <h3 className="text-xl md:text-2xl font-black text-white truncate">
                {group.level}
              </h3>
              <p className="text-sm text-white/70 font-medium">{group.levelHi}</p>
            </div>

            {/* Rank count badge */}
            <div className="flex items-center gap-3">
              <span
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: group.accentColor, color: group.color }}
              >
                {group.ranks.length} Ranks
              </span>
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-300">
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>
          </div>
        </button>

        {/* Expanded content */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="p-4 md:p-6 bg-white space-y-3">
            {group.ranks.map((rank, rIdx) => (
              <div
                key={rank.cadreNo}
                className={cn(
                  "group/rank rounded-2xl border transition-all duration-300 overflow-hidden",
                  "hover:shadow-lg hover:border-transparent"
                )}
                style={{
                  animationDelay: `${rIdx * 80}ms`,
                  borderColor: `${group.color}20`,
                }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 md:p-5">
                  {/* Cadre number */}
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white"
                    style={{ background: group.color }}
                  >
                    {rank.cadreNo}
                  </div>

                  {/* Title + stars */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="text-base md:text-lg font-bold text-slate-900 leading-tight">
                        {rank.titleEn}
                      </h4>
                      <div style={{ color: group.color }}>
                        <RankStars cadreNo={rank.cadreNo} />
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">{rank.titleHi}</p>
                  </div>

                  {/* Uniform info (tablet+) */}
                  <div className="hidden md:flex gap-4 flex-shrink-0">
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Shirt</p>
                      <p className="text-xs font-semibold text-slate-700 bg-slate-50 rounded-lg px-3 py-1.5">{rank.shirt}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Pant</p>
                      <p className="text-xs font-semibold text-slate-700 bg-slate-50 rounded-lg px-3 py-1.5">{rank.pant}</p>
                    </div>
                  </div>
                </div>

                {/* Notes bar */}
                <div
                  className="px-4 md:px-5 py-2.5 text-xs font-medium border-t"
                  style={{
                    background: `${group.color}08`,
                    borderColor: `${group.color}12`,
                    color: group.color === "#FFDA78" ? "#003285" : group.color,
                  }}
                >
                  {rank.notes}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────── Sainik (Basic Level) Card ────────────── */
function SainikCard() {
  return (
    <div className="relative rounded-[28px] overflow-hidden border-2 border-dashed border-[#003285]/30 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        <div className="flex-shrink-0 w-20 h-20 rounded-3xl bg-gradient-to-br from-[#003285] to-[#2A629A] flex items-center justify-center shadow-lg">
          <Shield className="w-10 h-10 text-[#FFDA78]" />
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.3em] text-[#FF7F3E] font-black mb-1">Foundation Level</p>
          <h3 className="text-2xl md:text-3xl font-black text-[#003285] mb-1">सैनिक / सैनिक दल सदस्य — Sainik (Volunteer)</h3>
          <p className="text-slate-500 font-medium text-sm">
            आधारभूत सदस्य, सामान्य यूनिफॉर्म खाकी शर्ट-पैंट • Uniform: खाकी / नीला शर्ट, खाकी पैंट
          </p>
        </div>
        <div className="hidden md:flex flex-col items-end gap-2">
          <span className="bg-[#FFDA78] text-[#003285] font-black text-xs px-4 py-2 rounded-full">Base Rank</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Main Page Component
   ══════════════════════════════════════════════════════════ */
export default function RankStructurePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="flex flex-col">
      {/* ── Hero Section ── */}
      <section className="relative pt-24 pb-32 bg-[#003285] overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] bg-[#FF7F3E]/15 blur-[130px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-[#FFDA78]/10 blur-[120px] rounded-full" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="bg-[#FF7F3E] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                Official Hierarchy
              </span>
              <span className="bg-white/10 text-[#FFDA78] border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm">
                Est. 1927 by Dr. B.R. Ambedkar
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
              SSD <span className="text-[#FFDA78]">Rank Structure</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/90 font-bold tracking-widest uppercase">
              समता सैनिक दल — पदानुक्रमित संरचना
            </p>
            <p className="text-lg text-blue-100/70 leading-relaxed font-medium max-w-3xl">
              Samata Sainik Dal follows a quasi-military hierarchical command structure inspired by the Indian Army,
              with Commander-based ranks spanning from the National level down to local volunteers (Sainiks).
            </p>
          </div>
        </div>
      </section>

      {/* ── Rank Cards Section ── */}
      <section className="relative z-20 -mt-12 rounded-t-[40px] md:rounded-t-[80px] bg-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          {/* Section header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-[#003285] mb-4">
              Organizational <span className="text-[#FF7F3E]">Hierarchy</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Click on each level to expand and view all ranks, uniform details, and responsibilities.
              The structure spans 16 cadre positions across 5 tiers, plus the Sainik (volunteer) foundation.
            </p>
          </div>

          {/* Level Cards */}
          <div className="max-w-4xl mx-auto space-y-6">
            {SSD_HIERARCHY.map((group, idx) => (
              <LevelCard
                key={group.level}
                group={group}
                index={idx}
                isOpen={openIndex === idx}
                toggle={() => toggle(idx)}
              />
            ))}

            {/* Sainik base level */}
            <div className="pt-4">
              <SainikCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── Unit Size Breakdown ── */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#003285] mb-4">
              Unit <span className="text-[#2A629A]">Formation</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
              The original SSD constitution defines unit sizes modeled after the Indian military formation system.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { count: "12", label: "Sainiks", unit: "= 1 Section", icon: "🔹" },
              { count: "24", label: "Sainiks", unit: "= 1 Platoon", icon: "🔷" },
              { count: "96", label: "Sainiks", unit: "= 1 Company", icon: "⚔️" },
              { count: "384", label: "Sainiks", unit: "= 1 Battalion", icon: "🛡️" },
            ].map((item) => (
              <div
                key={item.unit}
                className="relative p-8 bg-white rounded-[32px] shadow-xl shadow-slate-200/50 text-center hover:-translate-y-2 transition-all duration-300 group border border-slate-100"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-5xl font-black text-[#003285] mb-1">{item.count}</div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-2">{item.label}</div>
                <div className="text-base font-bold text-[#FF7F3E]">{item.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Uniform Info ── */}
      <section className="py-16 md:py-24 bg-[#003285] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#FFDA78]/10 blur-[120px] rounded-full" />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Uniform &amp; <span className="text-[#FFDA78]">Dress Code</span>
              </h2>
              <p className="text-blue-100/80 text-lg font-medium leading-relaxed">
                The SSD uniform is primarily <strong className="text-white">Khaki (खाकी)</strong> for both shirt and pant,
                reflecting the paramilitary discipline of the organization. Higher ranks may feature dark blue accents.
              </p>
              <ul className="space-y-3">
                {[
                  "Khaki shirt & pant — standard uniform",
                  "Dark blue cap / beret with SSD badge",
                  "SSD flag: Dark Blue (primary color of the flag)",
                  "Belt, badges, and rank insignia for officers",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-blue-100/90 font-medium">
                    <div className="w-5 h-5 flex-shrink-0 rounded-full bg-[#FF7F3E] flex items-center justify-center mt-0.5">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#FF7F3E] to-[#FFDA78] rounded-[50px] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative w-full max-w-xs bg-white rounded-[40px] p-10 shadow-2xl text-center">
                  <div className="text-7xl mb-6">👔</div>
                  <h3 className="text-2xl font-black text-[#003285] mb-2">खाकी Uniform</h3>
                  <p className="text-xs text-[#2A629A] font-bold tracking-[0.25em] uppercase mb-6">Since 1927</p>
                  <div className="h-px w-12 bg-[#FF7F3E] mx-auto mb-6" />
                  <div className="flex justify-center gap-3">
                    <div className="w-10 h-10 rounded-lg" style={{ background: "#c8a96e" }} title="Khaki" />
                    <div className="w-10 h-10 rounded-lg" style={{ background: "#003285" }} title="Deep Blue" />
                    <div className="w-10 h-10 rounded-lg" style={{ background: "#FFDA78" }} title="Gold" />
                    <div className="w-10 h-10 rounded-lg" style={{ background: "#FF7F3E" }} title="Orange" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Important Notes ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-[#003285] mb-8 text-center">
            Important <span className="text-[#FF7F3E]">Notes</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Historical Foundation",
                text: "SSD was established by Dr. B.R. Ambedkar in 1927 as a volunteer force to protect Dalit/oppressed communities and promote social equality, justice and fraternity.",
                color: "#003285",
              },
              {
                title: "Army-Inspired Structure",
                text: "The rank system mirrors the Indian Army's hierarchy but serves a social purpose — organizing disciplined volunteers for non-violent resistance and community service.",
                color: "#2A629A",
              },
              {
                title: "Core Purpose",
                text: 'Annihilation of caste-based inequality • Establishing liberty, equality, and fraternity • Service to workers, laborers, Dalits, and the oppressed.',
                color: "#FF7F3E",
              },
              {
                title: "Evolving Organization",
                text: "The basic hierarchy remains constant, but specific wings or state units may have additional positions. Check official SSD websites for the latest updates.",
                color: "#FFDA78",
              },
            ].map((note) => (
              <div
                key={note.title}
                className="p-8 rounded-[28px] border-l-8 bg-slate-50 hover:shadow-lg transition-all duration-300"
                style={{ borderColor: note.color }}
              >
                <h4 className="text-lg font-black mb-2" style={{ color: note.color === "#FFDA78" ? "#003285" : note.color }}>
                  {note.title}
                </h4>
                <p className="text-slate-600 font-medium text-sm leading-relaxed">{note.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-[#003285] font-black text-2xl">
              जय भीम! जय समता! 🙏
            </p>
            <p className="text-slate-400 text-sm mt-2 font-medium">
              Jai Bhim! Jai Samta!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
