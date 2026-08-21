import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, Clock, MapPin, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getEventBySlug } from "@/lib/supabase-rest"

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const rows = await getEventBySlug(slug)
  const event = rows[0]
  if (!event) notFound()
  const start = new Date(event.start_date)
  const end = new Date(event.end_date)
  return <main className="min-h-screen bg-background">
    <section className="bg-[#003285] px-4 py-20 text-white md:py-28">
      <div className="container max-w-5xl">
        <Link href="/events" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white"><ArrowLeft className="size-4" /> Back to events</Link>
        <div className="flex flex-wrap gap-2"><Badge className="bg-[#FFDA78] text-[#003285]">{event.category}</Badge><Badge variant="outline" className="border-white/30 text-white">{event.status}</Badge></div>
        <h1 className="mt-6 max-w-4xl text-balance text-4xl font-black leading-tight md:text-6xl">{event.title}</h1>
        <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-blue-100">{event.description}</p>
      </div>
    </section>
    <section className="container grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-[1fr_320px] md:py-20">
      <article className="rounded-3xl border bg-card p-6 shadow-sm md:p-10">
        <h2 className="text-2xl font-bold text-[#003285]">Two days of remembrance and service</h2>
        <p className="mt-5 leading-8 text-muted-foreground">SSD Delhi Foundation Day is a time to honour the movement&apos;s legacy, gather in fraternity, and renew our promise of service. Members, volunteers, families, and friends are invited to take part in the programme on 23 and 24 September.</p>
        <p className="mt-5 leading-8 text-muted-foreground">Come ready to listen, learn, and contribute. Together we can carry forward a tradition of equality, education, and collective action.</p>
        <Button asChild className="mt-8 bg-[#FF7F3E] text-white hover:bg-[#e9682d]"><Link href="/join">Register your interest</Link></Button>
      </article>
      <aside className="flex flex-col gap-4 rounded-3xl bg-[#003285] p-6 text-white">
        <h2 className="text-lg font-bold text-[#FFDA78]">Event details</h2>
        <div className="flex gap-3"><CalendarDays className="mt-1 size-5 text-[#FFDA78]" /><span>{start.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} – {end.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span></div>
        <div className="flex gap-3"><Clock className="mt-1 size-5 text-[#FFDA78]" /><span>{start.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })} to {end.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}</span></div>
        <div className="flex gap-3"><MapPin className="mt-1 size-5 text-[#FFDA78]" /><span>{event.venue}<br />{event.address}, {event.city}</span></div>
        <div className="flex gap-3"><Users className="mt-1 size-5 text-[#FFDA78]" /><span>Open to SSD members, volunteers, and friends</span></div>
      </aside>
    </section>
  </main>
}
