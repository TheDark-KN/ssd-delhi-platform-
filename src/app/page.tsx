"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, BookOpen, ArrowRight, Clock, TrendingUp, Shield } from "lucide-react";
import { MaterialIcon } from "@/components/ui/material-icon";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function HomePage() {
  // articles.list returns a paginated object — use getFeatured which returns a plain array
  const featuredArticles = useQuery(api.articles.getFeatured, { limit: 3 }) || [];
  const upcomingEvents = useQuery(api.events.list, { status: "upcoming", limit: 3 }) || [];

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NGO",
            "name": "Samata Sainik Dal",
            "alternateName": ["Samta Sainik Dal", "Saink dal", "SSD Delhi", "Smata Sainik Dal", "samta"],
            "url": "https://ssddelhi.org",
            "logo": "https://ssddelhi.org/logo.png",
            "foundingDate": "1924",
            "founder": {
              "@type": "Person",
              "name": "Dr. B.R. Ambedkar"
            },
            "description": "Official website of Samata Sainik Dal (SSD) Delhi - Soldiers for Equality. Founded by Dr. B.R. Ambedkar in 1924. Building a casteless society based on Liberty, Equality, and Fraternity."
          })
        }}
      />
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-48 bg-background overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-muted blur-[120px] rounded-full" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-12">
            <div className="space-y-6 max-w-4xl">
              <Badge className="bg-accent text-accent-foreground px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full animate-in fade-in slide-in-from-top-4 duration-1000">
                🎉 Centenary Celebrations 1924-2024
              </Badge>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-700">
                Samta Sainik Dal <span className="text-primary">Delhi</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium tracking-wide animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
                Soldiers for Equality — Building a Casteless Society based on Liberty, Equality, and Fraternity
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Link href="/join">
                <Button size="lg" className="text-lg font-bold px-10 py-7 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/20">
                  Join the Movement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/history">
                <Button variant="outline" size="lg" className="border-border bg-card hover:bg-muted text-lg font-bold px-10 py-7 rounded-full transition-all duration-300">
                  Explore 100 Years
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card relative z-20 -mt-16 rounded-t-[40px] md:rounded-t-[80px] border-t border-border">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-[#4F46E5]/5 text-[#F59E0B] group-hover:bg-[#F59E0B] group-hover:text-white transition-all duration-300">
                <MaterialIcon icon="history" variant="rounded" className="text-3xl" />
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-[#4F46E5]">100+</div>
                <div className="text-sm text-[#64748B] font-bold tracking-widest uppercase mt-1">Years of Legacy</div>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-[#64748B]/5 text-[#64748B] group-hover:bg-[#64748B] group-hover:text-white transition-all duration-300">
                <MaterialIcon icon="groups" variant="rounded" className="text-3xl" />
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-[#4F46E5]">10K+</div>
                <div className="text-sm text-[#64748B] font-bold tracking-widest uppercase mt-1">Active Soldiers</div>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-[#F59E0B]/10 text-[#F59E0B] group-hover:bg-[#F59E0B] group-hover:text-[#4F46E5] transition-all duration-300">
                <MaterialIcon icon="menu_book" variant="rounded" className="text-3xl" />
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-[#4F46E5]">500+</div>
                <div className="text-sm text-[#64748B] font-bold tracking-widest uppercase mt-1">Historical Records</div>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-[#F59E0B]/5 text-[#F59E0B] group-hover:bg-[#F59E0B] group-hover:text-white transition-all duration-300">
                <MaterialIcon icon="public" variant="rounded" className="text-3xl" />
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-[#4F46E5]">Pan India</div>
                <div className="text-sm text-[#64748B] font-bold tracking-widest uppercase mt-1">Global Impact</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#4F46E5] mb-4">
                Knowledge for <span className="text-[#F59E0B]">Liberation</span>
              </h2>
              <p className="text-lg text-[#64748B] font-medium">Learn about SSD&apos;s history, ideology, and the fight for social justice.</p>
            </div>
            <Link href="/articles">
              <Button variant="outline" className="border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white font-bold rounded-full px-6">
                View Library
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {!featuredArticles || featuredArticles.length === 0 ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="rounded-3xl border-none shadow-xl shadow-slate-200/50">
                  <CardHeader>
                    <Skeleton className="h-64 w-full mb-4 rounded-2xl" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                </Card>
              ))
            ) : (
              featuredArticles.map((article: any) => (
                <Link key={article._id} href={`/articles/${article.slug}`} className="group">
                  <Card className="h-full border-none shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden group-hover:-translate-y-2 transition-all duration-300">
                    <div className="aspect-[4/3] bg-gradient-to-br from-[#4F46E5] to-[#64748B] relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                      <Badge className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white border-white/20 font-bold uppercase tracking-tighter text-xs">
                        {article.category}
                      </Badge>
                    </div>
                    <CardHeader className="p-8">
                      <CardTitle className="text-2xl font-bold group-hover:text-[#F59E0B] transition-colors leading-tight mb-4">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-slate-600 line-clamp-3 text-base leading-relaxed">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Ambedkar Jayanti 2026 Hero Banner */}
      <section className="py-12 bg-gradient-to-r from-[#F59E0B] to-[#D97706] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 flex-1">
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 font-bold text-xs px-4 py-1.5 rounded-full">
                🎉 14 April 2026
              </Badge>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                Ambedkar Jayanti 2026 Registration
              </h2>
              <p className="text-white/90 text-lg font-medium max-w-2xl">
                Join Samata Sainik Dal Delhi in celebrating Dr. B.R. Ambedkar&apos;s birth anniversary.
                Register now and get your SSD_ID for future events.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link href="/ambedkar-jayanti-2026">
                <Button size="lg" className="bg-white text-[#F59E0B] hover:bg-muted text-lg font-black px-10 py-7 rounded-full shadow-2xl transition-all duration-300 hover:scale-105">
                  <Calendar className="w-5 h-5 mr-2" />
                  Register Now
                </Button>
              </Link>
              <Link href="/ambedkar-jayanti-2026/thank-you">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg font-bold px-10 py-7 rounded-full backdrop-blur-sm transition-all duration-300">
                  <Shield className="w-5 h-5 mr-2" />
                  Get SSD_ID
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 bg-card">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#4F46E5] mb-4">
                Upcoming <span className="text-[#64748B]">Programs</span>
              </h2>
              <p className="text-lg text-[#64748B] font-medium text-slate-600">Join us at our upcoming programs and contribute to the movement.</p>
            </div>
            <Link href="/events">
              <Button variant="ghost" className="text-[#4F46E5] font-bold hover:bg-[#4F46E5]/5 rounded-full px-6">
                Full Calendar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {!upcomingEvents || upcomingEvents.length === 0 ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="rounded-3xl border-slate-100 shadow-lg shadow-slate-100/50">
                  <CardHeader>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                </Card>
              ))
            ) : (
              upcomingEvents.map((event: any) => (
                <Link key={event._id} href={`/events/${event.slug}`} className="group">
                  <Card className="h-full border-2 border-slate-50 hover:border-[#64748B]/20 shadow-lg shadow-slate-100/50 rounded-3xl transition-all duration-300 group-hover:shadow-xl group-hover:shadow-[#64748B]/10">
                    <CardHeader className="p-8">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#F59E0B] mb-4 uppercase tracking-widest">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.startDate).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <CardTitle className="text-2xl font-bold group-hover:text-[#4F46E5] transition-colors line-clamp-2 leading-tight mb-4">
                        {event.title}
                      </CardTitle>
                      <CardDescription className="text-slate-500 line-clamp-2 text-base leading-relaxed mb-6">
                        {event.venue}, {event.city}
                      </CardDescription>
                      <Badge variant="secondary" className={cn(
                        "w-fit font-bold uppercase tracking-tighter text-[10px] px-3 py-1 rounded-full",
                        event.isPublic ? "bg-[#F59E0B] text-[#4F46E5]" : "bg-[#64748B] text-white"
                      )}>
                        {event.isPublic ? "Open to All" : "Members Only"}
                      </Badge>
                    </CardHeader>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Timeline Preview */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-y border-slate-100">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#4F46E5] mb-6">
              A Century of <span className="text-[#F59E0B]">Struggle</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              From 1924 to 2024, explore the rich history of Samta Sainik Dal and its role in India&apos;s social justice movement.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { year: "1924", title: "The Beginning", description: "Dr. B.R. Ambedkar established Samta Sainik Dal to protect the rights of the marginalized.", color: "#4F46E5" },
              { year: "1927", title: "Social Revolution", description: "The Mahad Satyagraha marked a turning point in the struggle for human dignity and equality.", color: "#64748B" },
              { year: "2024", title: "Centenary Year", description: "Celebrating 100 years of unwavering service to society and the mission of Babasaheb.", color: "#F59E0B" },
            ].map((era) => (
              <div key={era.year} className="relative group p-10 bg-white dark:bg-slate-950 rounded-[40px] shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 right-10 -translate-y-1/2 text-6xl font-black opacity-10 group-hover:opacity-20 transition-opacity" style={{ color: era.color }}>
                  {era.year}
                </div>
                <div className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: era.color }}>
                  Significant Milestone
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{era.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {era.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link href="/history">
              <Button size="lg" className="bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-full px-10 py-7">
                Explore Full Timeline
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#4F46E5] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[100%] bg-[#F59E0B]/10 blur-[150px] rounded-full rotate-45" />
        </div>

        <div className="container px-4 md:px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Ready to <span className="text-[#F59E0B]">Lead</span> the Change?
            </h2>
            <p className="text-xl text-white/80 font-medium">
              Join India&apos;s premier social equality organization. Stand for justice, equality, and human dignity for all.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Link href="/join">
                <Button size="lg" className="bg-[#F59E0B] hover:bg-[#ffe29a] text-[#4F46E5] text-lg font-black px-12 py-8 rounded-full shadow-2xl transition-all duration-300 hover:scale-105">
                  Become a Soldier
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white bg-white/5 hover:bg-white/10 text-lg font-bold px-12 py-8 rounded-full backdrop-blur-sm transition-all duration-300">
                  Get in Touch
                </Button>
              </Link>
            </div>
            <div className="pt-12 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="text-white font-black text-2xl tracking-tighter">LIBERTY</div>
              <div className="text-white font-black text-2xl tracking-tighter">EQUALITY</div>
              <div className="text-white font-black text-2xl tracking-tighter">FRATERNITY</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
