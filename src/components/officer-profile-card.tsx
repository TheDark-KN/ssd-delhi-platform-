import Link from "next/link";
import { Mail, MapPin, Users, ExternalLink } from "lucide-react";
import type { NationalOfficer } from "@/data/national-officers-en";

export function OfficerAvatar({ name, imageUrl }: { name: string; imageUrl?: string | null }) {
  return imageUrl ? <img src={imageUrl} alt={`${name} portrait`} className="h-full w-full object-cover" /> : <div aria-label={`${name} profile avatar`} className="flex h-full w-full items-center justify-center bg-primary text-3xl font-black text-primary-foreground">{name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div>;
}

export function OfficerProfileCard({ officer }: { officer: NationalOfficer & { slug?: string; email?: string | null; social_links?: Record<string, string>; zone?: string | null; total_sainik_count?: number; photo_url?: string | null } }) {
  return <Link href={`/national-executive/${officer.slug || officer.id}`} className="group block">
    <article className="h-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex justify-center bg-secondary/50 p-6"><div className="h-28 w-28 overflow-hidden rounded-full border-4 border-card shadow-md"><OfficerAvatar name={officer.name} imageUrl={officer.photo_url} /></div></div>
      <div className="space-y-3 p-5"><div><h3 className="text-lg font-black text-primary">{officer.name}</h3><p className="text-sm font-bold text-accent-foreground">{officer.designation}</p></div><p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-ring" />{officer.state}{officer.zone ? ` · ${officer.zone}` : ""}</p><div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"><Users className="h-4 w-4" />{officer.total_sainik_count ?? 0} Sainik under leadership</div>{officer.email && <p className="flex items-center gap-2 truncate text-xs text-muted-foreground"><Mail className="h-4 w-4" />{officer.email}</p>}<span className="inline-flex items-center gap-1 text-sm font-bold text-ring">View full profile <ExternalLink className="h-3.5 w-3.5" /></span></div>
    </article>
  </Link>;
}

export function SocialLinks({ links }: { links?: Record<string, string> | null }) { return <div className="flex flex-wrap gap-2">{Object.entries(links || {}).filter(([, url]) => url).map(([network, url]) => <a key={network} href={url} target="_blank" rel="noreferrer" className="rounded-full bg-secondary px-3 py-1 text-xs font-bold capitalize text-secondary-foreground">{network}</a>)}</div>; }
