import { notFound } from "next/navigation";
import Link from "next/link";
import { Mail, MapPin, Users, ArrowLeft, Shield } from "lucide-react";
import { getOfficerBySlug } from "@/lib/supabase-rest";
import { OfficerAvatar, SocialLinks } from "@/components/officer-profile-card";
import { AccessGate } from "@/components/access-gate";
import { Badge } from "@/components/ui/badge";

export default async function OfficerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const officer = await getOfficerBySlug(slug);
  if (!officer) notFound();

  return (
    <main className="min-h-screen bg-background">
      {/* Officer Header */}
      <section className="bg-[#003285] px-4 py-16 text-white md:py-24">
        <div className="container max-w-5xl">
          <Link
            href="/national-executive"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to National Officers
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge className="bg-[#FF7F3E] text-white font-bold uppercase tracking-widest text-xs">
              National Executive
            </Badge>
            <Badge variant="outline" className="border-white/30 text-white font-semibold">
              {officer.state}
            </Badge>
          </div>
          <h1 className="text-4xl font-black md:text-6xl text-white">{officer.name}</h1>
          <p className="mt-3 text-xl font-bold text-[#FFDA78]">{officer.designation}</p>
        </div>
      </section>

      {/* Officer Details */}
      <section className="container max-w-5xl px-4 py-12 md:py-20">
        <div className="overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-xl">
          <div className="grid gap-10 p-6 md:grid-cols-[240px_1fr] md:p-12">
            <div className="space-y-4 text-center md:text-left">
              <div className="mx-auto md:mx-0 h-48 w-48 overflow-hidden rounded-full border-4 border-[#003285]/20 shadow-lg ring-4 ring-[#FF7F3E]/20">
                <OfficerAvatar name={officer.name} imageUrl={officer.photo_url} />
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Official Cadre Profile
              </p>
            </div>

            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-secondary/50 p-5 border border-border/50">
                  <MapPin className="mb-2 h-5 w-5 text-[#2A629A]" />
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    State / Jurisdiction
                  </p>
                  <p className="mt-1 text-lg font-bold text-[#003285] dark:text-blue-300">
                    {officer.state}{officer.zone ? ` · ${officer.zone}` : ""}
                  </p>
                </div>
                <div className="rounded-2xl bg-secondary/50 p-5 border border-border/50">
                  <Users className="mb-2 h-5 w-5 text-[#FF7F3E]" />
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Volunteers & Sainiks
                  </p>
                  <p className="mt-1 text-lg font-bold text-[#003285] dark:text-blue-300">
                    {officer.total_sainik_count ? officer.total_sainik_count.toLocaleString() : "Active Unit"}
                  </p>
                </div>
              </div>

              {/* Guarded Direct Contact & Record Details */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#003285] dark:text-blue-400 mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#FF7F3E]" />
                  Official Contact & Communications
                </h3>
                
                <AccessGate
                  restriction="registered"
                  title="Sign In to Access Direct Contact"
                  description="Official phone numbers and direct communication lines are protected for verified members and registered supporters."
                  preview={
                    <p className="flex items-center gap-3 font-semibold text-muted-foreground">
                      <Mail className="h-5 w-5 text-[#2A629A]" />
                      <span>{officer.email ? "••••••••••••@ssddelhi.org" : "official-contact@ssddelhi.org"}</span>
                    </p>
                  }
                >
                  <div className="space-y-3">
                    {officer.email && (
                      <p className="flex items-center gap-3 font-bold text-[#003285] dark:text-blue-300">
                        <Mail className="h-5 w-5 text-[#FF7F3E]" />
                        <a href={`mailto:${officer.email}`} className="hover:underline">
                          {officer.email}
                        </a>
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      For official Samta Sainik Dal correspondence, please state your membership number or unit code.
                    </p>
                  </div>
                </AccessGate>
              </div>

              {officer.bio && (
                <section>
                  <h2 className="mb-3 text-2xl font-black text-[#003285] dark:text-white">About the Officer</h2>
                  <p className="leading-relaxed text-muted-foreground font-medium">{officer.bio}</p>
                </section>
              )}

              {officer.content_details && (
                <section>
                  <h2 className="mb-3 text-2xl font-black text-[#003285] dark:text-white">Responsibilities & Work</h2>
                  <p className="whitespace-pre-line leading-relaxed text-muted-foreground font-medium">{officer.content_details}</p>
                </section>
              )}

              {officer.social_links && Object.keys(officer.social_links).length > 0 && (
                <div>
                  <h3 className="mb-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Public Channels
                  </h3>
                  <SocialLinks links={officer.social_links} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const officer = await getOfficerBySlug((await params).slug);
  return {
    title: officer ? `${officer.name} | Samta Sainik Dal National Executive` : "National Officer Profile | SSD",
  };
}
