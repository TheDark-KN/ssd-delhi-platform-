"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { ArrowRight, CalendarDays, Clock3, Heart, Leaf, Library, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/context/LanguageContext";

const gardenImage = "/hero-background.jpg";
const ambedkarImage = "/dr-ambedkar.jpg";

const milestones = [
  { year: "1924", title: "A movement takes root", body: "The call for organised action, dignity, and education begins to gather force." },
  { year: "1927", title: "Courage at Mahad", body: "Volunteers stand with Dr. Ambedkar in the historic struggle for equal access." },
  { year: "1956", title: "A new moral horizon", body: "The Dhamma offers a language of fraternity, reason, and human liberation." },
  { year: "Today", title: "The work continues", body: "SSD Delhi carries this legacy into communities, classrooms, and public life." },
];

export default function HomePage() {
  const { t, language } = useLanguage();
  const articles = useQuery(api.articles.getFeatured, { limit: 3 });
  const events = useQuery(api.events.list, { status: "upcoming", limit: 3 });

  return (
    <div className="bg-background">
      <section className="relative isolate overflow-hidden bg-forest text-cream">
        <Image src={gardenImage} alt="Buddhist garden with flowers and prayer flags" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-forest/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/70 to-transparent" />
        <div className="container relative flex min-h-[560px] items-end px-4 pb-12 pt-24 sm:min-h-[620px] sm:px-6 sm:pb-16 sm:pt-28 md:min-h-[680px] md:items-center md:pb-24 md:pt-32">
          <div className="max-w-3xl">
            <p className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:mb-6 sm:gap-3 sm:text-sm sm:tracking-[0.25em]"><Leaf className="size-4" /> Samta Sainik Dal Delhi</p>
            <h1 className="max-w-3xl font-serif text-[2.75rem] leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">Knowledge is the first step toward liberation.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-cream/80 sm:mt-8 sm:text-lg sm:leading-8 md:text-xl">A living archive of the movement for liberty, equality, and fraternity — rooted in the vision of Dr. B. R. Ambedkar.</p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button asChild size="lg" className="w-full rounded-full bg-gold px-7 text-forest hover:bg-gold/90 sm:w-auto"><Link href="/history">Explore our history <ArrowRight data-icon="inline-end" /></Link></Button>
              <Button asChild size="lg" variant="outline" className="w-full rounded-full border-cream/40 bg-transparent px-7 text-cream hover:bg-cream/10 hover:text-cream sm:w-auto"><Link href="/join">Join the movement</Link></Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="border-b border-border bg-background py-10 sm:py-12">
        <div className="container grid grid-cols-2 gap-x-4 gap-y-8 px-4 sm:gap-8 sm:px-6 md:grid-cols-4">
          {[{ icon: Heart, value: "100+", label: "years of service" }, { icon: Users, value: "10K+", label: "members across India" }, { icon: Library, value: "500+", label: "programs and events" }, { icon: MapPin, value: "Pan India", label: "a growing network" }].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-start gap-3"><Icon className="mt-1 size-5 text-saffron" /><div><p className="font-serif text-2xl text-forest sm:text-3xl md:text-4xl">{value}</p><p className="mt-1 text-sm leading-5 text-muted-foreground">{label}</p></div></div>
          ))}
        </div>
      </section>

      <section className="container grid gap-10 px-4 py-16 sm:gap-12 sm:px-6 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted"><Image src={ambedkarImage} alt="Dr. B. R. Ambedkar portrait" fill priority className="object-cover object-top grayscale" sizes="(max-width: 1024px) 100vw, 40vw" /><div className="absolute inset-x-5 bottom-5 rounded-2xl bg-forest/90 p-5 text-cream backdrop-blur"><p className="font-serif text-xl">“Cultivation of mind should be the ultimate aim of human existence.”</p><p className="mt-2 text-xs uppercase tracking-[0.2em] text-gold">Dr. B. R. Ambedkar</p></div></div>
        <div className="max-w-xl"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-saffron">Why SSD Delhi exists</p><h2 className="mt-4 font-serif text-4xl leading-tight text-forest sm:text-5xl md:text-6xl">A history that still asks something of us.</h2><p className="mt-6 text-lg leading-8 text-muted-foreground">Samta Sainik Dal is a people’s movement for social transformation. We preserve the ideas, stories, and practices that help communities challenge caste and build a more equal society.</p><div className="mt-8 flex flex-wrap gap-3"><Badge variant="secondary" className="rounded-full px-4 py-2">Liberty</Badge><Badge variant="secondary" className="rounded-full px-4 py-2">Equality</Badge><Badge variant="secondary" className="rounded-full px-4 py-2">Fraternity</Badge></div><Button asChild variant="link" className="mt-8 px-0 text-forest hover:text-saffron"><Link href="/about">Learn about our organisation <ArrowRight data-icon="inline-end" /></Link></Button></div>
      </section>

      <section className="bg-sage/30 py-16 sm:py-24"><div className="container px-4 sm:px-6"><div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-saffron">From the archive</p><h2 className="mt-3 font-serif text-4xl text-forest md:text-5xl">Ideas worth carrying forward</h2></div><Button asChild variant="outline" className="w-fit rounded-full border-forest/30 text-forest hover:bg-forest hover:text-cream"><Link href="/articles">View all articles <ArrowRight data-icon="inline-end" /></Link></Button></div><div className="grid gap-6 md:grid-cols-3">{articles === undefined ? [1,2,3].map((item) => <Skeleton key={item} className="h-72 rounded-3xl" />) : articles.map((article: any) => <Link key={article._id} href={`/articles/${article.slug}`} className="group"><Card className="h-full rounded-3xl border-forest/10 bg-background/80 shadow-none transition-transform group-hover:-translate-y-1"><CardHeader><Badge variant="outline" className="w-fit rounded-full border-saffron/40 text-saffron">{article.category}</Badge><CardTitle className="font-serif text-2xl text-forest group-hover:text-saffron">{article.title}</CardTitle><CardDescription className="leading-6">{article.excerpt}</CardDescription></CardHeader><CardContent><span className="text-sm font-semibold text-forest">Read story <ArrowRight className="ml-1 inline size-4" /></span></CardContent></Card></Link>)}</div></div></section>

      <section className="container px-4 py-16 sm:px-6 sm:py-24"><div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-saffron">Be part of the work</p><h2 className="mt-3 font-serif text-4xl text-forest md:text-5xl">Gather, learn, act.</h2></div><Button asChild variant="link" className="w-fit px-0 text-forest"><Link href="/events">See the full calendar <ArrowRight data-icon="inline-end" /></Link></Button></div><div className="grid gap-6 md:grid-cols-3">{events === undefined ? [1,2,3].map((item) => <Skeleton key={item} className="h-64 rounded-3xl" />) : events.map((event: any) => <Link key={event._id} href={`/events/${event.slug}`} className="group"><Card className="h-full rounded-3xl border-border shadow-none transition-colors group-hover:border-saffron/50"><CardHeader><p className="flex items-center gap-2 text-sm font-medium text-saffron"><CalendarDays className="size-4" />{new Date(event.startDate).toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", { month: "short", day: "numeric", year: "numeric" })}</p><CardTitle className="font-serif text-2xl text-forest group-hover:text-saffron">{event.title}</CardTitle><CardDescription className="flex items-center gap-2"><MapPin className="size-4" />{event.venue}, {event.city}</CardDescription></CardHeader><CardContent><span className="text-sm text-muted-foreground"><Clock3 className="mr-1 inline size-4" /> Community gathering</span></CardContent></Card></Link>)}</div></section>

      <section className="bg-forest py-16 text-cream sm:py-24"><div className="container px-4 sm:px-6"><div className="mb-14 max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">A century in motion</p><h2 className="mt-3 font-serif text-4xl md:text-6xl">The past is a practice.</h2><p className="mt-5 leading-7 text-cream/70">Trace the milestones that shaped the movement — and the questions that remain alive today.</p></div><div className="grid gap-px overflow-hidden rounded-3xl bg-cream/15 sm:grid-cols-2 md:grid-cols-4">{milestones.map((milestone) => <div key={milestone.year} className="bg-forest p-7"><p className="font-serif text-4xl text-gold">{milestone.year}</p><h3 className="mt-6 text-lg font-semibold">{milestone.title}</h3><p className="mt-3 text-sm leading-6 text-cream/65">{milestone.body}</p></div>)}</div><Button asChild variant="outline" className="mt-10 rounded-full border-cream/30 bg-transparent text-cream hover:bg-cream/10 hover:text-cream"><Link href="/history">Walk through the timeline <ArrowRight data-icon="inline-end" /></Link></Button></div></section>

      <section className="relative overflow-hidden bg-saffron px-4 py-16 text-forest sm:px-6 sm:py-20"><div className="container relative flex flex-col justify-between gap-8 md:flex-row md:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.22em]">The next chapter is yours</p><h2 className="mt-3 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">Stand for dignity. Build solidarity.</h2></div><Button asChild size="lg" className="w-full rounded-full bg-forest px-8 text-cream hover:bg-forest/90 sm:w-fit"><Link href="/join">Become a member <ArrowRight data-icon="inline-end" /></Link></Button></div></section>
    </div>
  );
}
