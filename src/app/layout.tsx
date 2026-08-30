import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { EventAnnouncementPopup } from "@/components/event-announcement-popup";

const inter = Inter({ subsets:["latin"], variable:"--font-inter" });
const fraunces = Fraunces({ subsets:["latin"], variable:"--font-fraunces", weight:["400","500","600"] });

export const metadata: Metadata = {
  title: "Samta Sainik Dal Delhi | Soldiers for Equality",
  description: "The Delhi chapter of Samta Sainik Dal, founded by Dr. B.R. Ambedkar in 1924. Learn, organize, and stand for liberty, equality, and fraternity.",
  keywords: ["Samta Sainik Dal", "SSD Delhi", "Dr. B.R. Ambedkar", "social justice", "equality"],
  openGraph: { title:"Samta Sainik Dal Delhi", description:"Soldiers for Equality — building a casteless society.", siteName:"SSD Delhi", locale:"en_IN", type:"website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background" suppressHydrationWarning><body className={`${inter.variable} ${fraunces.variable} font-sans antialiased`} suppressHydrationWarning><Providers><div className="relative flex min-h-screen flex-col"><Header /><main className="flex-1">{children}</main><Footer /></div><Toaster /><EventAnnouncementPopup /><Analytics /></Providers></body></html>;
}
