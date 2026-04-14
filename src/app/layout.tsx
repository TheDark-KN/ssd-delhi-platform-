import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
// AI Chatbot temporarily disabled - enable after running: npx convex dev
// import { AIChatbot } from "@/components/ai-chatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Samta Sainik Dal Delhi | समता सैनिक दल दिल्ली",
  description: "Official website of Samta Sainik Dal (SSD) Delhi - Soldiers for Equality. Founded by Dr. B.R. Ambedkar in 1924. Building a casteless society based on Liberty, Equality, and Fraternity.",
  keywords: [
    "Samta Sainik Dal", 
    "smata sainik dal",
    "Samata Sainik Dal",
    "Saink dal", 
    "sainik dal",
    "samta", 
    "SSD Delhi", 
    "Dr. Ambedkar", 
    "Social Justice", 
    "Equality", 
    "Dalit Rights", 
    "Buddhism"
  ],
  authors: [{ name: "Samta Sainik Dal Delhi" }],
  openGraph: {
    title: "Samta Sainik Dal Delhi | समता सैनिक दल दिल्ली",
    description: "Official website of Samta Sainik Dal - Soldiers for Equality. Building a Casteless Society.",
    url: "https://ssddelhi.org",
    siteName: "SSD Delhi",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://ssddelhi.org",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <Analytics />
          {/* AI Chatbot temporarily disabled - enable after running: npx convex dev */}
          {/* <AIChatbot /> */}
        </Providers>
      </body>
    </html>
  );
}
