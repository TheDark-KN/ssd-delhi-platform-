"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, Image, Video, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const mediaResult = useQuery(api.media?.list as any, {
    type: selectedType as any || undefined,
    category: selectedCategory || undefined,
    limit: 50,
  });

  const media = mediaResult?.media ?? [];

  const categories = [...new Set(media.map((m: any) => m.category))] as string[];
  const types = ["image", "video", "document"];

  const filteredMedia = media.filter((item: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.tags.some((tag: string) => tag.toLowerCase().includes(query))
    );
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image": return <Image className="h-4 w-4" />;
      case "video": return <Video className="h-4 w-4" />;
      case "document": return <FileText className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-blue-deep pb-20 pt-20 text-paper sm:pb-32 sm:pt-24">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-saffron/20 blur-[120px] rounded-full" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl space-y-6">
            <Badge variant="outline" className="border-saffron text-saffron bg-saffron/10 px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full">
              Media gallery
            </Badge>
            <h1 className="font-serif text-[2.75rem] leading-tight tracking-tight text-paper sm:text-6xl md:text-7xl">
              A Century in <span className="text-saffron">Pictures</span>
            </h1>
            <p className="max-w-2xl text-base leading-7 text-paper/75 sm:text-xl sm:leading-relaxed">
              Photos, videos, and documents from SSD Delhi activities. Explore our legacy and the movement&apos;s journey.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="relative z-40 -mt-8 rounded-t-[2rem] border-b bg-background py-6 sm:-mt-12 sm:rounded-t-[5rem] sm:py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
            <div className="relative flex-1 w-full lg:max-w-md group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-deep transition-colors" />
              <Input
                placeholder="Search gallery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 rounded-2xl border-slate-200 focus:ring-blue-deep focus:border-blue-deep transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={!selectedType ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(null)}
                className={cn("rounded-full px-5 font-bold uppercase tracking-tight", !selectedType ? "bg-blue-deep hover:bg-[#002561]" : "border-slate-200 text-slate-600")}
              >
                All Media
              </Button>
              {types.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className={cn("rounded-full px-5 capitalize font-bold tracking-tight", selectedType === type ? "bg-blue-deep hover:bg-[#002561]" : "border-slate-200 text-slate-600")}
                >
                  {type}
                </Button>
              ))}
              {categories.map((category: string) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={cn("rounded-full px-5 font-bold tracking-tight", selectedCategory === category ? "bg-blue-deep hover:bg-[#002561]" : "border-slate-200 text-slate-600")}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          {mediaResult === undefined ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-48 w-full mb-4" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-12">
              <Image className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No media found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredMedia.map((item: any) => (
                <Card key={item._id} className="group overflow-hidden rounded-3xl border-none shadow-xl shadow-slate-100/60 transition-all duration-300 group-hover:-translate-y-1 sm:rounded-[40px] sm:group-hover:-translate-y-2">
                  <div className="group relative aspect-[4/3] overflow-hidden bg-slate-100">
                    {item.type === "image" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-deep to-[#2A629A]">
                        <Image className="h-16 w-16 text-white/20" />
                      </div>
                    )}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-deep to-[#2A629A]">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                          <Video className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    )}
                    {item.type === "document" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                        <FileText className="h-16 w-16 text-blue-deep/20" />
                      </div>
                    )}
                    <Badge className="absolute left-6 top-6 rounded-full border-white/10 bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-tighter text-white backdrop-blur-md">
                      {getTypeIcon(item.type)}
                      <span className="ml-1 capitalize font-black">{item.type}</span>
                    </Badge>
                  </div>
                  <CardContent className="p-5 sm:p-8 md:p-10">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge className="rounded-full border-none bg-[#2A629A]/10 px-3 py-1 text-[10px] font-black uppercase tracking-tighter text-[#2A629A]">
                        {item.category}
                      </Badge>
                      {item.year && <span className="text-xs font-black text-slate-400">{item.year}</span>}
                    </div>
                    <CardTitle className="mb-4 text-2xl font-black text-blue-deep transition-colors group-hover:text-saffron">{item.title}</CardTitle>
                    {item.description && <CardDescription className="mb-6 line-clamp-2 text-base font-medium leading-relaxed text-slate-500">{item.description}</CardDescription>}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 border-t border-slate-50 pt-6">
                        {item.tags.slice(0, 3).map((tag: string, i: number) => <Badge key={i} className="border-none bg-slate-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">#{tag}</Badge>)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
