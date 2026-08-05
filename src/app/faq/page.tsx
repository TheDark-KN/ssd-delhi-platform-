"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, HelpCircle, Shield } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What is Samta Sainik Dal (SSD)?",
    answer: "Samta Sainik Dal (Social Equality Army) is a historic volunteer organization founded by Dr. B.R. Ambedkar to struggle for the eradication of caste discrimination and to establish social equality, liberty, and fraternity across Indian society.",
  },
  {
    question: "When and why was Samta Sainik Dal founded?",
    answer: "It was formally established in 1924 (with major events in 1927 like the Mahad Satyagraha) as a disciplined volunteer corps. Dr. Ambedkar founded it to protect the peaceful satyagrahis, advocate for the rights of marginalized communities, and serve as an organized shield against social oppression.",
  },
  {
    question: "What are the core principles of SSD?",
    answer: "SSD is founded on the principles of Liberty, Equality, and Fraternity as articulated by Dr. Ambedkar and inspired by the ethical path of Buddhism. Its main goal is the complete annihilation of the graded caste hierarchy and building a casteless society.",
  },
  {
    question: "How can I join SSD Delhi as a volunteer?",
    answer: "Any person who subscribes to the principles of social justice and equality can apply to register. You can sign up using our online Membership Registration form (/join) or contact our local Delhi team directly.",
  },
  {
    question: "Does SSD have a rank or military structure?",
    answer: "Yes, SSD uses a disciplined, quasi-military structure with volunteer ranks (from Sainik up to Supreme Commander-in-Chief) to coordinate community service, protect social rights movements, and maintain peace during large public gatherings.",
  },
  {
    question: "Is Samta Sainik Dal affiliated with any political party?",
    answer: "No. SSD is an independent social volunteer organization dedicated to social change, constitutional advocacy, community service, and civil rights protection. It is not a political party.",
  },
  {
    question: "How is SSD Delhi funded?",
    answer: "SSD Delhi is a fully community-driven organization. We do not accept government funding or corporate sponsorships. Our activities are supported solely through voluntary contributions and donations from members and well-wishers.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
              ❓ Got Questions?
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
              Frequently Asked <span className="text-[#FFDA78]">Questions</span>
            </h1>
            <p className="text-xl text-blue-100/90 font-medium leading-relaxed max-w-2xl">
              Find answers to common questions about Samta Sainik Dal's history, volunteer registry, rank system, and operations in Delhi.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 relative z-20 -mt-12 rounded-t-[40px] md:rounded-t-[80px] bg-slate-50 dark:bg-slate-950">
        <div className="container px-4 md:px-6 max-w-3xl">
          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <Card 
                  key={index} 
                  className="border-none shadow-md hover:shadow-lg transition-all duration-200 rounded-3xl overflow-hidden bg-white dark:bg-slate-900"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none focus:bg-slate-50/50 dark:focus:bg-slate-800/30"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <HelpCircle className="h-6 w-6 text-[#FF7F3E] flex-shrink-0" />
                      <span className="font-bold text-lg md:text-xl text-[#003285] dark:text-white leading-tight">
                        {faq.question}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-slate-400 flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  {isOpen && (
                    <CardContent className="px-6 md:px-8 pb-8 pt-0 border-t border-slate-50 dark:border-slate-800/50">
                      <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed pt-6 font-medium">
                        {faq.answer}
                      </p>
                    </CardContent>
                  )}
                </Card>
              );
            })}

            {/* CTA */}
            <div className="p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-slate-900/30 flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
              <div className="text-center sm:text-left space-y-1">
                <h4 className="font-bold text-[#003285] dark:text-white text-lg">Still have questions?</h4>
                <p className="text-xs text-slate-500 font-medium">Our volunteers are here to help. Reach out to our Delhi headquarters.</p>
              </div>
              <Button asChild size="lg" className="rounded-full bg-[#003285] hover:bg-[#002561] text-white font-bold px-8 py-6">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>

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
