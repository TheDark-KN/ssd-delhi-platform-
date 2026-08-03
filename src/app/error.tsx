"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center space-y-12 bg-slate-50 dark:bg-slate-950">
            <div className="relative group">
                <div className="absolute inset-0 bg-[#F59E0B]/20 blur-3xl rounded-full group-hover:bg-[#F59E0B]/30 transition-all" />
                <div className="relative h-24 w-24 rounded-[32px] bg-[#4F46E5] flex items-center justify-center text-white shadow-2xl shadow-primary/20">
                    <ShieldAlert className="h-12 w-12" />
                </div>
            </div>

            <div className="space-y-4 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-black text-[#4F46E5] tracking-tight uppercase">
                    System Alert
                </h1>
                <p className="text-slate-500 font-bold text-lg uppercase tracking-widest">
                    Something went wrong in the module integration
                </p>
                <div className="h-1 w-20 bg-[#F59E0B] mx-auto rounded-full mt-6" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                    onClick={() => reset()}
                    size="lg"
                    className="h-14 px-8 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 gap-3"
                >
                    <RefreshCcw className="h-5 w-5" />
                    Re-Initialize
                </Button>
                <Link href="/">
                    <Button
                        variant="outline"
                        size="lg"
                        className="h-14 px-8 border-2 border-slate-200 hover:border-[#F59E0B] hover:text-[#F59E0B] rounded-2xl font-black uppercase tracking-widest gap-3 transition-all"
                    >
                        <Home className="h-5 w-5" />
                        Abort to Base
                    </Button>
                </Link>
            </div>

            <div className="pt-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-full border border-slate-100 shadow-sm">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Debug Hash:</span>
                    <code className="text-[10px] font-black text-[#F59E0B]">{error.digest || "NULL_EXCEPTION"}</code>
                </div>
            </div>
        </div>
    );
}
