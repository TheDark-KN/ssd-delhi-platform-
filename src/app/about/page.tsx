import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Target,
  Users,
  Shield,
  Heart,
  Scale,
  Award,
  Building2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Landmark,
  Compass,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About SSD | Samta Sainik Dal Delhi",
  description:
    "Learn about Samta Sainik Dal (SSD) — founded by Bodhisattva Dr. B.R. Ambedkar in 1924. Discover our ideology, command structure, national office, and mission for a casteless society.",
  keywords: [
    "About Samta Sainik Dal",
    "SSD Ideology",
    "Dr. B.R. Ambedkar",
    "Casteless Society",
    "National Office",
    "National Executive",
    "Samata Sainik Dal",
    "SSD Delhi",
    "Ambedkarite Movement",
  ],
};

const quickNavItems = [
  { id: "organization", label: "Overview", icon: Building2 },
  { id: "ideology", label: "Ideology", icon: Scale },
  { id: "structure", label: "Structure", icon: Shield },
  { id: "national-office", label: "National Office", icon: Landmark },
  { id: "ambedkar", label: "Babasaheb Heritage", icon: BookOpen },
  { id: "vision", label: "Vision & Mission", icon: Target },
];

const statsData = [
  { label: "Founded by Babasaheb", value: "1924", detail: "Over 100 years of service" },
  { label: "Active Presence", value: "All-India", detail: "State & district units" },
  { label: "Supreme Goal", value: "Casteless", detail: "Society based on fraternity" },
  { label: "Founding Event", value: "Mahad 1927", detail: "Water satyagraha defense" },
];

const strategicPillars = [
  {
    icon: Shield,
    title: "Social Defense & Protection",
    description:
      "A disciplined volunteer corps established to safeguard satyagrahis, protect peaceful gatherings, and defend the human dignity of oppressed communities.",
    highlight: "Rooted in Mahad Satyagraha (1927)",
  },
  {
    icon: Scale,
    title: "Constitutional Awareness",
    description:
      "Promoting constitutional literacy, rule of law, and democratic political education as the primary weapons against caste discrimination.",
    highlight: "Preamble-Driven Transformation",
  },
  {
    icon: Heart,
    title: "Moral & Spiritual Awakening",
    description:
      "Embracing the ethical teachings of the Buddha (1956 Deekshabhoomi) to provide a non-violent, compassionate philosophical foundation for equality.",
    highlight: "Liberty, Equality, Fraternity",
  },
];

const ideologyPrinciples = [
  {
    icon: Heart,
    title: "Samata (Equality) as Core Principle",
    description:
      "Not merely opposing untouchability, but dismantling the entire graded caste hierarchy to build genuine social democracy.",
    tag: "Fundamental Axiom",
  },
  {
    icon: Scale,
    title: "Liberty, Equality, Fraternity",
    description:
      "Three inseparable pillars. Fraternity is the lived brotherhood that breathes reality into constitutional equality and freedom.",
    tag: "Preamble Soul",
  },
  {
    icon: Shield,
    title: "Constitutional Struggle Over Violence",
    description:
      "Commitment to non-violent agitation, legal redress, community education, and civic mobilisation as the enduring tools of change.",
    tag: "Disciplined Action",
  },
  {
    icon: Target,
    title: "Annihilation of Caste",
    description:
      "The definitive goal is the total elimination of caste-based social stratification, not merely reformist concessions within the system.",
    tag: "Ultimate Objective",
  },
  {
    icon: Compass,
    title: "Ethical & Spiritual Foundation",
    description:
      "The 1956 mass embrace of Buddhism at Deekshabhoomi Nagpur, providing moral elevation and self-respect to millions.",
    tag: "Deekshabhoomi Legacy",
  },
  {
    icon: Users,
    title: "Women's Vanguard Leadership",
    description:
      "Equal, active participation of women — continuing the pioneering tradition established at the historic 1927 Mahad women's conference.",
    tag: "Gender Equality",
  },
  {
    icon: Award,
    title: "Discipline, Cadre & Service",
    description:
      "Trained volunteers who maintain order, educate villages, provide humanitarian disaster relief, and safeguard democratic gatherings.",
    tag: "Sainik Discipline",
  },
];

const commandLevels = [
  {
    tier: "Cadre 1 – 4",
    title: "Central / National Command",
    subtitle: "Supreme Commander-in-Chief & National Executive",
    description:
      "Apex national leadership guiding nationwide policy, interstate coordination, and national rallies.",
  },
  {
    tier: "Cadre 5 – 7",
    title: "State / Provincial Command",
    subtitle: "State Commanders & Provincial Committees",
    description:
      "Directs state-level training camps, regional mobilisation, and district oversight across Indian states.",
  },
  {
    tier: "Cadre 8 – 10",
    title: "District Command",
    subtitle: "District Commanders & Zonal Officers",
    description:
      "Manages district units, tehsil coordination, and grassroots volunteer enrollments.",
  },
  {
    tier: "Cadre 11 – 13",
    title: "Tehsil / Area Command",
    subtitle: "Area Commanders & Sub-Divisional Leads",
    description:
      "Localized coordination for community vigilance, educational meetings, and village outreach.",
  },
  {
    tier: "Cadre 14 – 16",
    title: "Sanghayan / Local Unit",
    subtitle: "Unit Commanders & Squad Leaders",
    description:
      "Neighborhood units operating on the front lines of social service, library centers, and community support.",
  },
  {
    tier: "Grassroots Foundation",
    title: "Sainik (Volunteers)",
    subtitle: "Active Soldiers for Equality",
    description:
      "The lifeblood of the movement: dedicated, disciplined citizens sworn to equality and community defense.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* ─── Hero Section ──────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-28 md:pt-32 md:pb-36 bg-[#003285] text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -left-20 h-96 w-96 rounded-full bg-[#FF7F3E]/25 blur-[120px]" />
          <div className="absolute -bottom-32 -right-20 h-[30rem] w-[30rem] rounded-full bg-[#2A629A]/40 blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#FFDA78] backdrop-blur-md">
              <Shield className="h-3.5 w-3.5" />
              <span>Founded 1924 by Dr. B.R. Ambedkar</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1]">
              About <span className="text-[#FFDA78]">Samta Sainik Dal</span>
            </h1>

            <p className="text-lg sm:text-2xl text-[#FF7F3E] font-bold tracking-wide uppercase">
              समता सैनिक दल — Soldiers for Equality
            </p>

            <p className="text-base sm:text-xl text-blue-100/90 leading-relaxed max-w-3xl font-normal">
              Samta Sainik Dal (SSD) is an all-India disciplined volunteer force founded by Bodhisattva Dr. B.R. Ambedkar.
              For over a century, our sainiks have stood on the front lines to defend constitutional rights, protect oppressed communities, and strive tirelessly toward a casteless, egalitarian India.
            </p>

            {/* Quick Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#FF7F3E] hover:bg-[#d95720] text-white font-bold rounded-full px-8 shadow-lg shadow-[#FF7F3E]/25"
              >
                <Link href="/join">
                  Join SSD Today <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white font-bold rounded-full px-7 hover:bg-white/10 hover:text-white"
              >
                <Link href="/national-executive">
                  <Landmark className="mr-2 h-4 w-4 text-[#FFDA78]" />
                  National Office & Leadership
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quick Jump Sub-Navigation Chips ────────────────────────────── */}
      <div className="sticky top-16 sm:top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-xs">
        <div className="container px-4 md:px-6">
          <nav className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar" aria-label="About page sections">
            {quickNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-card px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-[#003285] hover:text-[#003285] dark:hover:text-[#FFDA78] transition-all"
                >
                  <Icon className="h-3.5 w-3.5 text-[#FF7F3E]" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ─── Section 1: Organization Overview ──────────────────────────── */}
      <section id="organization" className="py-20 md:py-28 relative scroll-mt-28">
        <div className="container px-4 md:px-6 space-y-16">
          {/* Header */}
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#FF7F3E]">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#003285] dark:text-white tracking-tight">
                Organization <span className="text-[#FF7F3E]">Overview</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium">
                Established on 13 March 1927 in the crucible of the Mahad Satyagraha, Samta Sainik Dal was conceived by Dr. B.R. Ambedkar not as a conventional political faction, but as a dedicated, non-violent volunteer corps.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                Across ten decades of struggle, SSD volunteers have provided the organizational backbone for historic social movements, protected public rallies, spearheaded literacy drives, and built local centers of self-reliance across the subcontinent.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {statsData.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-2xl sm:text-3xl font-black text-[#003285] dark:text-blue-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#FF7F3E] mb-2">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Pillars */}
          <div>
            <div className="text-center mb-10">
              <h3 className="text-2xl sm:text-3xl font-black text-[#003285] dark:text-white">
                Three Strategic Pillars
              </h3>
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mt-2">
                The Foundational Framework of Samta Sainik Dal
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {strategicPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="group relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#003285]/10 text-[#003285] dark:bg-blue-950/50 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7 text-[#FF7F3E]" />
                    </div>
                    <Badge variant="outline" className="mb-3 text-[10px] font-bold uppercase text-[#2A629A] dark:text-blue-300">
                      {pillar.highlight}
                    </Badge>
                    <h4 className="text-xl font-black text-[#003285] dark:text-white mb-3">
                      {pillar.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 2: Core Ideology ──────────────────────────────────── */}
      <section id="ideology" className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900/50 scroll-mt-28 border-y border-border/50">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#FF7F3E]">
              Guiding Philosophy
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#003285] dark:text-white tracking-tight">
              Our Core <span className="text-[#FF7F3E]">Ideology</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
              Samta Sainik Dal’s philosophy is drawn directly from Dr. B.R. Ambedkar’s seminal writings and speeches spanning three decades of struggle — emphasizing social justice, intellectual emancipation, and moral brotherhood.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ideologyPrinciples.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 shadow-sm hover:shadow-xl hover:border-[#FF7F3E]/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="h-12 w-12 rounded-2xl bg-[#003285]/5 dark:bg-blue-950/40 flex items-center justify-center text-[#FF7F3E] group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                        {item.tag}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-black text-[#003285] dark:text-white mb-3 group-hover:text-[#FF7F3E] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Section 3: Organizational Hierarchy ───────────────────────── */}
      <section id="structure" className="py-20 md:py-28 relative scroll-mt-28">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#FF7F3E]">
              Cadre & Discipline
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#003285] dark:text-white tracking-tight">
              Command & <span className="text-[#2A629A]">Rank Structure</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
              Modeled as a disciplined civil defense corps, SSD maintains a well-defined cadre hierarchy enabling rapid mobilization, transparent accountability, and coordinated national actions.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {commandLevels.map((cmd, idx) => (
              <div
                key={cmd.title}
                className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-all border-l-8 border-l-[#003285] hover:border-l-[#FF7F3E]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-widest text-[#FF7F3E]">
                    {cmd.tier}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    Level {idx + 1}
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#003285] dark:text-white mb-1">
                  {cmd.title}
                </h3>
                <p className="text-xs font-bold text-[#2A629A] dark:text-blue-400 mb-3">
                  {cmd.subtitle}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {cmd.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <Button
              asChild
              size="lg"
              className="bg-[#003285] hover:bg-[#002561] text-white font-bold rounded-full px-8 shadow-lg"
            >
              <Link href="/rank-structure">
                <Shield className="mr-2 h-4 w-4 text-[#FFDA78]" />
                Explore Detailed Rank Structure & Cadres →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Section 4: NEW National Office & Executive Leadership ─────── */}
      <section id="national-office" className="py-20 md:py-28 bg-[#003285] text-white relative overflow-hidden scroll-mt-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#FFDA78]/10 blur-[130px]" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#FF7F3E]/20 blur-[130px]" />
        </div>

        <div className="container relative z-10 px-4 md:px-6 space-y-12">
          <div className="max-w-3xl space-y-4">
            <Badge className="bg-[#FFDA78] text-[#003285] font-black uppercase tracking-widest text-xs px-4 py-1 rounded-full">
              🏛️ Central Leadership
            </Badge>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
              National Office & <span className="text-[#FFDA78]">Executive Leadership</span>
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed font-medium">
              The National Executive of Samta Sainik Dal coordinates state units, conducts national officer assemblies, and steers constitutional defense programs across India.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* National Head Office Card */}
            <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md p-8 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-[#FFDA78] text-[#003285] flex items-center justify-center font-black">
                <Landmark className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black text-white">National Head Office</h3>
              <p className="text-sm text-blue-100/80 leading-relaxed font-medium">
                Coordinating all provincial commanders, policy frameworks, national conclaves, and historical commemorations at Deekshabhoomi & Dr. Ambedkar Bhawan.
              </p>
              <div className="pt-2 text-xs font-bold text-[#FFDA78] uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Deekshabhoomi • New Delhi
              </div>
            </div>

            {/* Officer Directory Card */}
            <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md p-8 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-[#FF7F3E] text-white flex items-center justify-center font-black">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black text-white">Office Bearers Directory</h3>
              <p className="text-sm text-blue-100/80 leading-relaxed font-medium">
                Profiles of the National President, General Secretary, National Treasurer, Vice Presidents, and State Leadership across India.
              </p>
              <div className="pt-2 text-xs font-bold text-[#FFDA78] uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> All-India Office Bearers
              </div>
            </div>

            {/* State Coordination Card */}
            <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md p-8 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-[#2A629A] text-white flex items-center justify-center font-black">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black text-white">Delhi & State Units</h3>
              <p className="text-sm text-blue-100/80 leading-relaxed font-medium">
                Active regional commands in Delhi NCR, Uttar Pradesh, Rajasthan, Himachal Pradesh, Madhya Pradesh, Gujarat, and Bihar.
              </p>
              <div className="pt-2 text-xs font-bold text-[#FFDA78] uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Nationwide Network
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/20 bg-gradient-to-r from-white/15 to-white/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-2xl font-black text-white">Explore the National Officers Directory</h4>
              <p className="text-sm text-blue-100/90 font-medium">
                View the verified list of national office bearers, designations, jurisdictions, and official portraits.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-[#FF7F3E] hover:bg-[#d95720] text-white font-bold rounded-full px-8 shrink-0 shadow-lg shadow-[#FF7F3E]/30"
            >
              <Link href="/national-executive">
                View National Officers Directory <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Section 5: Dr. B.R. Ambedkar Heritage ──────────────────────── */}
      <section id="ambedkar" className="py-20 md:py-28 bg-white dark:bg-slate-950 scroll-mt-28">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#003285]/10 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-[#003285] dark:text-blue-400">
                <Sparkles className="h-3.5 w-3.5 text-[#FF7F3E]" />
                Supreme Commander & Founder
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-[#003285] dark:text-white tracking-tight leading-tight">
                Bodhisattva <span className="text-[#FF7F3E]">Dr. B.R. Ambedkar</span>
              </h2>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Dr. Bhimrao Ramji Ambedkar (1891–1956) was an intellectual colossus — jurist, economist, statesman, chief architect of the Constitution of India, and champion of human rights.
              </p>

              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Recognizing that legal rights alone cannot protect marginalized citizens without an organized, vigilant community force, Babasaheb founded Samta Sainik Dal to instill discipline, pride, and self-defense among the masses.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Chief Architect of the Indian Constitution",
                  "Leader of Historic 1927 Mahad Satyagraha",
                  "Pioneered Equal Rights for Women",
                  "Architect of 1956 Buddhist Renaissance",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5 text-sm font-bold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-[#FF7F3E] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <blockquote className="rounded-2xl border-l-4 border-[#FF7F3E] bg-slate-50 dark:bg-slate-900/60 p-5 text-sm font-medium italic text-slate-600 dark:text-slate-300">
                  “Educate, Agitate, Organize — Have faith in yourselves and never lose hope. Samata Sainik Dal is the backbone of our fight for human dignity.”
                  <footer className="mt-2 text-xs font-bold not-italic text-[#003285] dark:text-blue-400">
                    — Dr. B.R. Ambedkar (Address to SSD Cadres, Kanpur 1944)
                  </footer>
                </blockquote>
              </div>
            </div>

            {/* Heritage Showcase Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 rounded-[48px] bg-gradient-to-tr from-[#003285] via-[#2A629A] to-[#FF7F3E] opacity-20 blur-xl" />
                <div className="relative rounded-[40px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center shadow-2xl space-y-6">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#003285] to-[#2A629A] text-white shadow-xl ring-4 ring-[#FFDA78]/40">
                    <Shield className="h-14 w-14 text-[#FFDA78]" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-[#003285] dark:text-white">Babasaheb Ambedkar</h3>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF7F3E] mt-1">1891 – 1956</p>
                    <p className="text-xs text-slate-400 font-semibold mt-1">Founder & Supreme Commander</p>
                  </div>

                  <div className="space-y-3 text-left border-t border-slate-100 dark:border-slate-800 pt-5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                    <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
                      <span className="text-slate-400 font-bold">First Session</span>
                      <span className="font-bold text-[#003285] dark:text-blue-300">20 July 1942, Nagpur</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
                      <span className="text-slate-400 font-bold">Constitution Approved</span>
                      <span className="font-bold text-[#003285] dark:text-blue-300">30 Jan 1944, Kanpur</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400 font-bold">Mass Conversion</span>
                      <span className="font-bold text-[#003285] dark:text-blue-300">14 Oct 1956, Deekshabhoomi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 6: Vision & Mission ───────────────────────────────── */}
      <section id="vision" className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900/40 scroll-mt-28 border-t border-border/50">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#FF7F3E]">
              Our Horizon
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#003285] dark:text-white tracking-tight">
              Vision & <span className="text-[#FF7F3E]">Mission</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Vision Card */}
            <div className="rounded-[36px] bg-[#003285] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform pointer-events-none">
                <Compass className="h-40 w-40" />
              </div>
              <div className="space-y-4 relative z-10">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#FFDA78]">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-black">Our Vision</h3>
                <p className="text-blue-100/90 text-lg leading-relaxed font-medium">
                  A casteless, democratic, humane India where every human being enjoys equal rights, self-respect, and uninhibited freedom, liberated from all forms of social tyranny, dogma, and untouchability.
                </p>
              </div>
              <div className="pt-8 border-t border-white/10 mt-8 relative z-10 text-xs font-bold tracking-widest uppercase text-[#FFDA78]">
                Liberty • Equality • Fraternity
              </div>
            </div>

            {/* Mission Card */}
            <div className="rounded-[36px] bg-[#FF7F3E] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform pointer-events-none">
                <Target className="h-40 w-40" />
              </div>
              <div className="space-y-4 relative z-10">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-black">Our Mission</h3>
                <p className="text-white/95 text-lg leading-relaxed font-medium">
                  To recruit, train, and deploy disciplined volunteers as “soldiers for equality” who educate communities, protect democratic mobilizations, defend legal safeguards, and foster brotherly solidarity across all sectors of society.
                </p>
              </div>
              <div className="pt-8 border-t border-white/20 mt-8 relative z-10 text-xs font-bold tracking-widest uppercase text-white">
                Educate • Agitate • Organize
              </div>
            </div>
          </div>

          {/* Call to Action Bar */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 sm:p-12 text-center shadow-lg space-y-6">
            <h3 className="text-2xl sm:text-4xl font-black text-[#003285] dark:text-white">
              Stand With the Soldiers for Equality
            </h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base font-medium leading-relaxed">
              Whether through active volunteer cadre training, community education, or sharing historical archives, you have a vital role in building Babasaheb&apos;s vision.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-[#003285] hover:bg-[#002561] text-white font-bold rounded-full px-8 shadow-md"
              >
                <Link href="/join">Enlist as a Volunteer</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-slate-300 dark:border-slate-700 text-[#003285] dark:text-white font-bold rounded-full px-8"
              >
                <Link href="/articles">Explore Knowledge Repository</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
