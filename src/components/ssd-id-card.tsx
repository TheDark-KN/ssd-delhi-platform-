"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Calendar, MapPin, UserCircle, Download, QrCode, CheckCircle } from "lucide-react";

interface SSDIDCardProps {
  ssdId: string;
  fullName: string;
  fatherName?: string;
  dateOfBirth: string;
  gender: string;
  mobileNumber: string;
  email: string;
  state: string;
  district: string;
  roleInEvent: string;
  passportPhotoUrl?: string | null;
  registeredAt: number;
}

export default function SSDIDCard({
  ssdId,
  fullName,
  fatherName,
  dateOfBirth,
  gender,
  mobileNumber,
  email,
  state,
  district,
  roleInEvent,
  passportPhotoUrl,
  registeredAt,
}: SSDIDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    // In production, use html2canvas or similar library
    // For now, trigger print dialog
    window.print();
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Generate a simple QR code data URL (in production, use a proper QR library)
  const qrData = `SSD-ID:${ssdId}|NAME:${fullName}|EVENT:AY2026`;

  return (
    <div className="space-y-6">
      {/* ID Card */}
      <Card 
        ref={cardRef}
        className="overflow-hidden border-0 shadow-2xl rounded-3xl max-w-2xl mx-auto print:shadow-none print:border-2"
      >
        {/* Header - Blue Gradient */}
        <div className="bg-gradient-to-r from-[#003285] to-[#2A629A] p-6 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 border-4 border-white rounded-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-4 border-white rounded-full" />
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Shield className="w-10 h-10 text-[#FFDA78]" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight">SAMATA SAINIK DAL</h1>
                <p className="text-sm text-blue-200 font-medium">Delhi Chapter • Ambedkar Jayanti 2026</p>
              </div>
            </div>
            <Badge className="bg-[#FF7F3E] text-white font-bold text-xs px-3 py-1.5 rounded-full">
              EVENT PASS
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <CardContent className="p-0">
          <div className="grid md:grid-cols-3 gap-0">
            {/* Photo Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex flex-col items-center justify-center border-r border-blue-100">
              <div className="w-40 h-48 rounded-xl overflow-hidden border-4 border-white shadow-lg bg-white mb-4">
                {passportPhotoUrl ? (
                  <img 
                    src={passportPhotoUrl} 
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <UserCircle className="w-20 h-20 text-gray-300" />
                  </div>
                )}
              </div>
              <Badge className="bg-[#003285] text-white font-bold text-xs px-4 py-1.5 rounded-full mb-2">
                {roleInEvent}
              </Badge>
              <p className="text-xs text-gray-500 font-medium">Event Role</p>
            </div>

            {/* Details Section */}
            <div className="md:col-span-2 p-6 space-y-4">
              {/* SSD ID - Prominent Display */}
              <div className="bg-gradient-to-r from-[#FFDA78] to-[#FFE09A] rounded-2xl p-4 text-center border-2 border-[#FF7F3E]">
                <p className="text-xs font-bold text-[#003285] uppercase tracking-widest mb-1">SSD Member ID</p>
                <p className="text-2xl md:text-3xl font-black text-[#003285] tracking-tight">{ssdId}</p>
              </div>

              {/* Personal Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Full Name</p>
                  <p className="text-sm font-bold text-[#003285]">{fullName}</p>
                </div>
                {fatherName && (
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Father&apos;s Name</p>
                    <p className="text-sm font-bold text-[#003285]">{fatherName}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Date of Birth</p>
                  <p className="text-sm font-bold text-[#003285]">{new Date(dateOfBirth).toLocaleDateString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Gender</p>
                  <p className="text-sm font-bold text-[#003285]">{gender}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">State</p>
                  <p className="text-sm font-bold text-[#003285]">{state}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">District</p>
                  <p className="text-sm font-bold text-[#003285]">{district}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Mobile</p>
                  <p className="text-sm font-bold text-[#003285]">+91 {mobileNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Registration Date</p>
                  <p className="text-sm font-bold text-[#003285]">{formatDate(registeredAt)}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm font-bold text-[#003285] truncate">{email}</p>
              </div>
            </div>
          </div>

          {/* Footer - QR Code & Validation */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 border-t border-gray-100">
            <div className="flex items-center justify-between gap-4">
              {/* QR Code */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white rounded-xl border-2 border-gray-200 flex items-center justify-center p-2">
                  <QrCode className="w-12 h-12 text-[#003285]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#003285] uppercase tracking-wider">Scan to Verify</p>
                  <p className="text-xs text-gray-500">Valid for Ambedkar Jayanti 2026</p>
                </div>
              </div>

              {/* Event Details */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#FF7F3E]" />
                  <span className="font-bold text-[#003285]">14 Apr 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF7F3E]" />
                  <span className="font-bold text-[#003285]">Ambedkar Bhawan</span>
                </div>
              </div>

              {/* Validity Badge */}
              <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-xl">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-xs font-bold text-green-700">VALID</span>
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="bg-[#003285] px-6 py-3 text-center">
            <p className="text-xs font-bold text-[#FFDA78] uppercase tracking-[0.3em]">
              Liberty • Equality • Fraternity
            </p>
            <p className="text-xs text-blue-200/60 mt-1">
              This card is property of Samata Sainik Dal Delhi • Must be displayed at event entry
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Download Button (Hidden in Print) */}
      <div className="flex justify-center gap-4 mt-6 print:hidden">
        <Button
          onClick={handleDownload}
          className="bg-[#003285] hover:bg-[#002561] text-white font-bold rounded-full px-8 py-6 shadow-lg shadow-[#003285]/30"
        >
          <Download className="w-5 h-5 mr-2" />
          Download ID Card
        </Button>
        <Button
          onClick={() => window.print()}
          variant="outline"
          className="border-2 border-[#003285] text-[#003285] hover:bg-[#003285] hover:text-white font-bold rounded-full px-8 py-6"
        >
          Print ID Card
        </Button>
      </div>
    </div>
  );
}
