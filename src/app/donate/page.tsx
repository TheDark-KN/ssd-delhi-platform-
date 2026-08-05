import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Info, Landmark, Copy, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Support Our Movement | Samta Sainik Dal Delhi",
  description: "Support the fight for equality and social justice. Samta Sainik Dal is a voluntary organization funded by community contributions.",
};

export default function DonatePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 bg-[#003285] overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2A629A]/30 blur-[120px] rounded-full" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl space-y-6">
            <Badge variant="outline" className="border-[#FF7F3E] text-[#FFDA78] bg-[#FF7F3E]/10 px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full">
              🤝 Support the Cause
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
              Support Our <span className="text-[#FFDA78]">Movement</span>
            </h1>
            <p className="text-xl text-blue-100/90 font-medium leading-relaxed max-w-2xl">
              Samata Sainik Dal is built on community-driven voluntarism. Your financial contributions help us organize rallies, run public education campaigns, and support community legal response units.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 relative z-20 -mt-12 rounded-t-[40px] md:rounded-t-[80px] bg-slate-50 dark:bg-slate-950">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="grid gap-8">
            {/* Info Message */}
            <div className="flex items-start gap-4 p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-[24px]">
              <Info className="h-6 w-6 text-[#2A629A] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="font-bold text-[#003285] dark:text-blue-400">Important Note</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">
                  Samta Sainik Dal is entirely voluntary and does not receive government funding. We rely solely on contributions from members, well-wishers, and those who believe in Dr. B.R. Ambedkar's mission for a casteless society.
                </p>
              </div>
            </div>

            {/* Bank details Card */}
            <Card className="border-none shadow-2xl shadow-slate-100/80 dark:shadow-slate-900/50 rounded-[40px] overflow-hidden bg-white dark:bg-slate-900">
              <div className="h-2 bg-gradient-to-r from-[#003285] via-[#2A629A] to-[#FF7F3E]" />
              <CardHeader className="p-8 md:p-12 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Landmark className="h-8 w-8 text-[#FF7F3E]" />
                  <CardTitle className="text-3xl font-black text-[#003285] dark:text-white uppercase tracking-tight">Bank Transfer</CardTitle>
                </div>
                <CardDescription className="text-slate-500 font-medium text-base">
                  Direct bank transfer is the most secure way to contribute. You can make an NEFT, RTGS, or IMPS transfer using the details below.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 md:p-12 pt-0 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Account Holder Name", value: "SAMTA SAINIK DAL DELHI" },
                    { label: "Bank Name", value: "State Bank of India (SBI)" },
                    { label: "Account Number", value: "12345678901 (Mock)" },
                    { label: "IFSC Code", value: "SBIN0000001 (Mock)" },
                    { label: "Account Type", value: "Current Account" },
                    { label: "Branch", value: "New Delhi Main Branch" },
                  ].map((detail) => (
                    <div key={detail.label} className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{detail.label}</span>
                      <span className="text-lg font-bold text-[#003285] dark:text-blue-300 select-all">{detail.value}</span>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[24px] border border-dashed border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="font-bold text-slate-700 dark:text-slate-300">Need a Donation Receipt?</h4>
                    <p className="text-xs text-slate-500 font-medium">Please send a screenshot of the transaction with your full name and address to our team.</p>
                  </div>
                  <Button asChild size="lg" className="rounded-full bg-[#003285] hover:bg-[#002561] text-white font-bold px-8 py-6">
                    <Link href="/contact">Submit Receipt</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Back Button */}
            <div className="text-center mt-6">
              <Button asChild variant="ghost" className="rounded-full px-6 font-bold text-slate-600 dark:text-slate-400">
                <Link href="/">← Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
