"use client";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
const NOTICE_IMAGE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/23-24%20sep-lTdPrTmRbKvNG2LxdGrrvV0qcrn7Ts.jpeg";
export function EventAnnouncementPopup() { const [open, setOpen] = useState(true); if (!open) return null; return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Event announcement"><div className="relative max-h-[92vh] max-w-lg overflow-auto rounded-2xl bg-card p-2 shadow-2xl"><button type="button" onClick={() => setOpen(false)} aria-label="Close event announcement" className="absolute right-3 top-3 z-10 rounded-full bg-card p-2 text-foreground shadow-md"><X className="h-5 w-5" /></button><Image src={NOTICE_IMAGE} alt="Samta Sainik Dal स्थापना दिवस समारोह notice" width={1200} height={1600} className="h-auto w-full rounded-xl" priority /></div></div>; }
