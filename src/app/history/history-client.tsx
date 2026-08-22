"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { listHistory } from "@/lib/supabase-rest";
import { DEFAULT_TIMELINE, type TimelineMilestone } from "@/lib/articles-data";

export function HistoryClient() {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [supabaseEvents, setSupabaseEvents] = useState<TimelineMilestone[] | null>(null);

  useEffect(() => {
    let active = true;
    listHistory(selectedEra || undefined)
      .then((data) => {
        if (!active) return;
        setSupabaseEvents(data && data.length > 0
          ? data
          : DEFAULT_TIMELINE.filter((item) => !selectedEra || item.era === selectedEra));
      })
      .catch(() => {
        if (active) {
          setSupabaseEvents(DEFAULT_TIMELINE.filter((item) => !selectedEra || item.era === selectedEra));
        }
      });

    return () => {
      active = false;
    };
  }, [selectedEra]);

  const rawEvents = supabaseEvents ?? DEFAULT_TIMELINE.filter(
    (item) => !selectedEra || item.era === selectedEra,
  );

  const eras = [...new Set(DEFAULT_TIMELINE.map((e: TimelineMilestone) => e.era))];

  // Filter by search and year
  const timelineEvents = rawEvents.filter((event: TimelineMilestone) => {
    if (selectedYear && event.year !== selectedYear) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        event.title.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        (event.dateDisplay && event.dateDisplay.toLowerCase().includes(q)) ||
        (event.significance && event.significance.toLowerCase().includes(q)) ||
        String(event.year).includes(q)
      );
    }
    return true;
  });

  // Get unique years for filtering
  const years = [...new Set(DEFAULT_TIMELINE.map((e: TimelineMilestone) => e.year))].sort((a, b) => a - b);

  return (
    <>
      {/* Filters Section */}
      <section className="py-6 md:py-8 bg-white dark:bg-slate-950 border-b relative z-30 -mt-8 md:-mt-12 rounded-t-[24px] md:rounded-t-[48px] shadow-sm">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-5">
            {/* Era Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 hidden sm:inline">Eras:</span>
              <Button
                variant={!selectedEra ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedEra(null)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs md:text-sm font-bold transition-all",
                  !selectedEra 
                    ? "bg-[#003285] text-white hover:bg-[#002561] shadow-md" 
                    : "border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300"
                )}
              >
                All Eras ({DEFAULT_TIMELINE.length})
              </Button>
              {eras.map((era: string) => {
                const count = DEFAULT_TIMELINE.filter((e) => e.era === era).length;
                return (
                  <Button
                    key={era}
                    variant={selectedEra === era ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedEra(era)}
                    className={cn(
                      "rounded-full px-4 py-2 text-xs md:text-sm font-bold transition-all",
                      selectedEra === era 
                        ? "bg-[#003285] text-white hover:bg-[#002561] shadow-md" 
                        : "border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300"
                    )}
                  >
                    {era} ({count})
                  </Button>
                );
              })}
            </div>

            {/* Quick Year Jump */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex-shrink-0">Jump to Year:</span>
              <Button
                variant={selectedYear === null ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedYear(null)}
                className="rounded-full px-3 py-1 font-bold text-xs flex-shrink-0 h-8"
              >
                All
              </Button>
              {years.map((year: number) => (
                <Button
                  key={year}
                  variant={selectedYear === year ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                  className={cn(
                    "rounded-full px-3 py-1 font-bold text-xs flex-shrink-0 h-8",
                    selectedYear === year && "bg-[#FF7F3E]/15 text-[#d95720] border border-[#FF7F3E]/30"
                  )}
                >
                  {year}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 md:py-20 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="container px-4 md:px-6 max-w-5xl">
          {timelineEvents.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl p-8 border">
              <Calendar className="h-12 w-12 text-[#FF7F3E] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#003285] dark:text-white mb-2">No timeline events found</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                Try selecting &apos;All Eras&apos; or clear the search filter to view all 14 milestones.
              </p>
              <Button 
                onClick={() => { setSelectedEra(null); setSelectedYear(null); setSearchQuery(""); }} 
                className="bg-[#003285] text-white rounded-full px-6"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="relative">
              {/* Central vertical spine */}
              <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-[#003285] via-[#2A629A] to-[#FF7F3E] rounded-full hidden sm:block opacity-30" />

              <div className="space-y-8 md:space-y-12">
                {timelineEvents.map((event: TimelineMilestone, index: number) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div
                      key={event._id || event.id || `${event.year}-${index}`}
                      className={cn(
                        "relative flex flex-col sm:flex-row gap-6 md:gap-10 items-start",
                        isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                      )}
                    >
                      {/* Timeline Node Marker */}
                      <div className="absolute left-4 md:left-1/2 top-7 -translate-x-1/2 hidden sm:flex items-center justify-center z-20">
                        <div className="size-6 rounded-full bg-[#FF7F3E] border-4 border-white dark:border-slate-900 shadow-md shadow-[#FF7F3E]/50 flex items-center justify-center">
                          <div className="size-1.5 rounded-full bg-white" />
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className={cn(
                        "w-full sm:w-[calc(50%-2rem)] flex-1",
                        isEven ? "sm:text-right" : "sm:text-left"
                      )}>
                        <Card className="overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-md hover:shadow-xl transition-all duration-300 rounded-[24px] md:rounded-[32px] p-6 md:p-8">
                          <CardHeader className="p-0 mb-4">
                            {/* Date Badge & Era */}
                            <div className={cn(
                              "flex items-center gap-2 mb-3 flex-wrap",
                              isEven ? "sm:justify-end" : "sm:justify-start"
                            )}>
                              <Badge className="bg-[#FF7F3E]/10 text-[#d95720] dark:text-[#FFDA78] border-[#FF7F3E]/20 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                                {event.era}
                              </Badge>
                              <div className="inline-flex items-center gap-1.5 bg-[#003285]/10 text-[#003285] dark:text-[#FFDA78] px-3 py-1 rounded-full text-xs font-black">
                                <Calendar className="size-3.5 text-[#003285] dark:text-[#FFDA78]" />
                                {event.dateDisplay || event.date_display || event.year}
                              </div>
                            </div>

                            {/* Milestone Title */}
                            <CardTitle className="text-xl md:text-2xl font-black text-[#003285] dark:text-white leading-snug">
                              {event.title}
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="p-0 space-y-4">
                            {/* Description */}
                            <CardDescription className="text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                              {event.description}
                            </CardDescription>

                            {/* Significance Callout */}
                            {event.significance && (
                              <div className={cn(
                                "p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border-l-4 border-[#FF7F3E] text-left",
                                isEven && "sm:border-l-0 sm:border-r-4"
                              )}>
                                <div className="flex items-center gap-2 mb-1.5 text-[#003285] dark:text-[#FFDA78]">
                                  <BookOpen className="size-4 text-[#FF7F3E]" />
                                  <span className="font-bold text-xs uppercase tracking-wider">Significance</span>
                                </div>
                                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                                  {event.significance}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>

                      {/* Spacer to balance the grid on desktop */}
                      <div className="hidden sm:block sm:w-[calc(50%-2rem)] flex-1" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Historical Note */}
      <section className="py-12 md:py-16 bg-white dark:bg-slate-950 border-t">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border">
            <h2 className="text-xl md:text-2xl font-bold text-[#003285] dark:text-white">Historical Note on Centenary & Dates</h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Samata Sainik Dal as a named organisation was formally constituted on 13 March 1927 ahead of the historic Mahad Satyagraha. The movement&apos;s 1924–2024 centenary framing honours July 1924, when Dr. B.R. Ambedkar founded the Bahishkrit Hitakarini Sabha — his first organised effort against untouchability and the foundational institutional root of the soldiers for equality.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
