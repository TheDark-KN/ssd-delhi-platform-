"use client";

import { Button } from "@/components/ui/button";
import { Home, Search, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center space-y-12 bg-slate-50 dark:bg-slate-950">
            <div className="relative group">
                <div className="absolute inset-0 bg-[#4F46E5]/10 blur-3xl rounded-full group-hover:bg-[#4F46E5]/20 transition-all" />
                <div className="relative h-24 w-24 rounded-[32px] bg-[#4F46E5] flex items-center justify-center text-white shadow-2xl shadow-primary/20">
                    <ShieldAlert className="h-12 w-12 text-[#F59E0B]" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#F59E0B] text-white px-3 py-1 rounded-full text-xs font-black shadow-lg">
                    404 ERROR
                </div>
            </div>

            <div className="space-y-4 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-black text-[#4F46E5] tracking-tight uppercase">
                    Route Terminated
                </h1>
                <p className="text-slate-500 font-bold text-lg uppercase tracking-widest">
                    The requested coordinate does not exist in our system
                </p>
                <div className="h-1 w-20 bg-[#F59E0B] mx-auto rounded-full mt-6" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/">
                    <Button
                        size="lg"
                        className="h-14 px-8 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 gap-3"
                    >
                        <Home className="h-5 w-5" />
                        Return to Base
                    </Button>
                </Link>
                <Link href="/articles">
                    <Button
                        variant="outline"
                        size="lg"
                        className="h-14 px-8 border-2 border-slate-200 hover:border-[#F59E0B] hover:text-[#F59E0B] rounded-2xl font-black uppercase tracking-widest gap-3 transition-all"
                    >
                        <Search className="h-5 w-5" />
                        Consult Archives
                    </Button>
                </Link>
            </div>

            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] max-w-xs leading-relaxed">
                If you believe this is a system malfunction, please contact the SSD Delhi technical bureau.
            </p>
        </div>
    );
}
