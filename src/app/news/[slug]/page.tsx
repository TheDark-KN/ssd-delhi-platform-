"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Eye, User, Share2, Bookmark, Megaphone, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const news = useQuery(api.news?.getBySlug as any, { slug });

  if (!news) {
    return (
      <div className="container py-12">
        <div className="max-w-3xl mx-auto space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!news) {
    notFound();
  }

  return (
    <article className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 pb-48 bg-[#4F46E5] overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F59E0B]/20 blur-[120px] rounded-full" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className={cn("px-4 py-1 text-xs font-black uppercase tracking-widest rounded-full border-none",
                news.urgent ? "bg-error text-white shadow-lg shadow-error/20" : "bg-[#64748B]/20 text-[#F59E0B] border border-[#64748B]"
              )}>
                {news.urgent && <Megaphone className="h-3 w-3 mr-1" />}
                {news.urgent ? "Urgent Dispatch" : news.category}
              </Badge>
              <Badge variant="outline" className="border-white/20 text-white/80 bg-white/5 px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full">
                {new Date(news.publishedAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              {news.headline}
            </h1>

            <div className="flex items-center gap-8 text-sm font-bold text-white/60 flex-wrap uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-[#F59E0B]">
                  <Megaphone className="h-5 w-5" />
                </div>
                <span>SSD Newsroom</span>
              </div>
              {news.expiresAt && (
                <div className="flex items-center gap-2 text-error">
                  <Calendar className="h-5 w-5" />
                  <span>Expires: {new Date(news.expiresAt).toLocaleDateString("en-IN")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="pb-24 -mt-24 relative z-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-900 shadow-2xl shadow-slate-200/50 dark:shadow-none rounded-[40px] md:rounded-[80px] p-8 md:p-20 border border-slate-100 dark:border-slate-800">
              {news.featuredImage && (
                <div className="aspect-video bg-[#4F46E5]/5 rounded-[40px] mb-12 flex items-center justify-center overflow-hidden">
                  <div className="h-20 w-20 rounded-full bg-[#4F46E5]/10 flex items-center justify-center">
                    <Megaphone className="h-10 w-10 text-[#4F46E5]" />
                  </div>
                </div>
              )}

              <div
                className="prose prose-lg md:prose-xl dark:prose-invert max-w-none prose-headings:text-[#4F46E5] prose-headings:font-black prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-[#F59E0B] prose-strong:text-[#4F46E5] dark:prose-strong:text-white"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />

              {/* Sources */}
              {news.sources && news.sources.length > 0 && (
                <div className="mt-16 p-10 bg-[#4F46E5]/5 rounded-[40px] border border-[#4F46E5]/10">
                  <h3 className="text-xl font-black text-[#4F46E5] mb-8 flex items-center gap-3 uppercase tracking-tight">
                    <ExternalLink className="h-6 w-6 text-[#F59E0B]" />
                    Official Sources
                  </h3>
                  <ul className="space-y-6">
                    {news.sources.map((source: any, index: number) => (
                      <li key={index} className="flex gap-4 group">
                        <span className="font-black text-2xl text-[#4F46E5]/20">{index + 1}</span>
                        <div>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#4F46E5] font-bold hover:text-[#F59E0B] flex items-center gap-2 group-hover:translate-x-1 transition-all"
                          >
                            {source.title}
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related News */}
      <RelatedNews />
    </article>
  );
}

function RelatedNews() {
  const news = useQuery(api.news?.list as any, { limit: 3 }) || [];

  if (news.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 border-t">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-black text-[#4F46E5] mb-12 uppercase tracking-tight">Recent Updates</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {news.map((item: any) => (
            <Link key={item._id} href={`/news/${item.slug}`} className="group">
              <div className="p-8 bg-white dark:bg-slate-900 rounded-[32px] border-none shadow-xl shadow-slate-200/50 dark:shadow-none group-hover:-translate-y-2 transition-all duration-300">
                <Badge className={cn("mb-6 border-none font-black uppercase tracking-tighter text-[10px] px-3 py-1 rounded-full",
                  item.urgent ? "bg-error text-white" : "bg-[#64748B]/10 text-[#64748B]"
                )}>
                  {item.urgent ? "Urgent" : item.category}
                </Badge>
                <h3 className="text-xl font-black text-[#4F46E5] group-hover:text-[#F59E0B] transition-colors leading-tight mb-4 line-clamp-2">
                  {item.headline}
                </h3>
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">
                  {new Date(item.publishedAt).toLocaleDateString("en-IN")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
