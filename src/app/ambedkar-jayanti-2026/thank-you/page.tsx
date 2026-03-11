"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Calendar, MapPin, Mail, ArrowLeft, Shield, Phone, Download, Loader2 } from "lucide-react";
import SSDIDCard from "@/components/ssd-id-card";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const ssdId = searchParams.get("ssdId") || "";
  const [showIDCard, setShowIDCard] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fetch registration data if SSD_ID is provided
  const registration = useQuery(
    api.ambedkarJayanti.getRegistrationBySSDID,
    ssdId ? { ssdId } : { ssdId: undefined }
  );

  // Set mounted and auto-show ID card after 2 seconds
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (registration && ssdId) {
      const timer = setTimeout(() => {
        setShowIDCard(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [registration, ssdId]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003285] via-[#002561] to-[#001a3d] py-8 px-4 flex items-center justify-center">
        <Card className="max-w-md w-full rounded-3xl shadow-2xl border-0">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-16 h-16 text-[#FF7F3E] mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-black text-[#003285] mb-2">Loading...</h1>
            <p className="text-gray-600">Please wait while we fetch your registration details.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!ssdId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003285] via-[#002561] to-[#001a3d] py-8 px-4 flex items-center justify-center">
        <Card className="max-w-md w-full rounded-3xl shadow-2xl border-0">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-16 h-16 text-[#FF7F3E] mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-black text-[#003285] mb-2">No Registration Found</h1>
            <p className="text-gray-600 mb-4">Please complete your registration first.</p>
            <Link href="/ambedkar-jayanti-2026">
              <Button className="bg-[#FF7F3E] hover:bg-[#ff6a1a] text-white font-bold rounded-full px-6 py-3">
                Register Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003285] via-[#002561] to-[#001a3d] py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Success Header */}
        <Card className="rounded-3xl shadow-2xl border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-[#FF7F3E] to-[#ff6a1a] p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="w-14 h-14 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                Registration Confirmed!
              </h1>
              <p className="text-white/90 font-medium">
                Jai Bhim! Jai Samta!
              </p>
            </div>
          </div>

          <CardContent className="p-8 space-y-6">
            {/* SSD ID Display */}
            <div className="bg-gradient-to-r from-[#FFDA78] to-[#FFE09A] rounded-3xl p-8 text-center border-4 border-[#FF7F3E] shadow-xl">
              <p className="text-sm font-bold text-[#003285] uppercase tracking-widest mb-2">
                Your SSD Member ID
              </p>
              <p className="text-4xl md:text-5xl font-black text-[#003285] tracking-tight mb-4">
                {ssdId}
              </p>
              <Badge className="bg-[#003285] text-white px-4 py-2 text-sm font-bold">
                Save this ID for future SSD events
              </Badge>
            </div>

            {/* Main Confirmation Message */}
            <div className="text-center space-y-3">
              <p className="text-lg text-gray-700 leading-relaxed">
                Thank you! Your spot for <strong className="text-[#003285]">SSD Ambedkar Jayanti 2026</strong> is confirmed.
              </p>
              <p className="text-gray-600">
                Check your email for updates and further instructions about the event.
                Your digital ID card is ready for download below.
              </p>
            </div>

            {/* Event Details Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 space-y-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-[#003285]" />
                <h2 className="font-bold text-[#003285] text-lg">Event Details</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 rounded-xl bg-[#FF7F3E]/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#FF7F3E]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Date</p>
                    <p className="font-bold text-[#003285]">14 April 2026 (Tuesday)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 rounded-xl bg-[#FF7F3E]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#FF7F3E]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Venue</p>
                    <p className="font-bold text-[#003285]">Ambedkar Bhawan, Rani Jhansi Road, Delhi</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 rounded-xl bg-[#FF7F3E]/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#FF7F3E]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Confirmation</p>
                    <p className="font-bold text-[#003285]">Email sent to your registered address</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 rounded-xl bg-[#FF7F3E]/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#FF7F3E]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Helpline</p>
                    <p className="font-bold text-[#003285]">+91-XXXXXXXXXX</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Next Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="font-bold text-[#003285] mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#FF7F3E]" />
                What Happens Next
              </h3>
              <div className="space-y-3">
                {[
                  { step: 1, text: "Download your SSD ID card below" },
                  { step: 2, text: "Confirmation email with registration details" },
                  { step: 3, text: "Event schedule and program details (1 week before)" },
                  { step: 4, text: "Final reminder with venue instructions (1 day before)" },
                  { step: 5, text: "Bring your ID card to the event for entry" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#003285] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <p className="text-gray-700 text-sm font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/events" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-2 border-[#003285] text-[#003285] hover:bg-[#003285] hover:text-white rounded-full font-bold py-6"
                >
                  View All Events
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="ghost"
                  className="w-full text-gray-600 hover:text-[#003285] font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>

          {/* Card Footer */}
          <div className="bg-gradient-to-r from-[#003285]/5 to-[#2A629A]/5 px-8 py-6 text-center border-t">
            <Badge className="bg-[#FF7F3E] text-white px-4 py-1.5 text-sm font-bold mb-3">
              🎉 See you on Ambedkar Jayanti!
            </Badge>
            <p className="text-sm text-gray-600 font-medium">
              Liberty • Equality • Fraternity
            </p>
          </div>
        </Card>

        {/* ID Card Section */}
        {registration && showIDCard && (
          <Card className="rounded-3xl shadow-2xl border-0 overflow-hidden print:shadow-none print:border-2">
            <CardHeader className="bg-gradient-to-r from-[#003285] to-[#2A629A] text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Shield className="w-6 h-6 text-[#FFDA78]" />
                    Your SSD ID Card
                  </CardTitle>
                  <p className="text-blue-200 text-sm mt-1">
                    Download or print this card for event entry
                  </p>
                </div>
                <Badge className="bg-[#FFDA78] text-[#003285] font-bold text-xs px-4 py-2 rounded-full">
                  Ambedkar Jayanti 2026
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <SSDIDCard
                ssdId={registration.ssdId || ssdId}
                fullName={registration.fullName}
                fatherName={registration.fatherName}
                dateOfBirth={registration.dateOfBirth}
                gender={registration.gender}
                mobileNumber={registration.mobileNumber}
                email={registration.email}
                state={registration.state}
                district={registration.district}
                roleInEvent={registration.roleInEvent}
                registeredAt={registration.registeredAt}
              />
            </CardContent>
          </Card>
        )}

        {/* Additional Info */}
        <div className="text-center space-y-3 print:hidden">
          <p className="text-blue-200/80 text-sm font-medium">
            For any queries, contact us at{" "}
            <a href="mailto:info@ssddelhi.org" className="text-[#FFDA78] hover:underline">
              info@ssddelhi.org
            </a>
          </p>
          <div className="flex items-center justify-center gap-2 text-blue-300/60 text-xs">
            <Shield className="w-3 h-3" />
            <span>Your data is secure and used only for event purposes per Indian data laws</span>
          </div>
        </div>
      </div>
    </div>
  );
}
