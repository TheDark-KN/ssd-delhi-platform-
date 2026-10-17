"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Loader2, Shield } from "lucide-react";
import { toast } from "sonner";
import { AuthGuard } from "@/components/auth-guard";
import { applyForSsdId, getMySsdIdApplications, getSsdIdDownloadUrl, type SsdIdApplication } from "@/lib/ssd-api";

export default function MembershipCardPage() {
  return (
    <AuthGuard title="SSD ID Card" description="Sign in to request and access your official Samta Sainik Dal ID card.">
      <MembershipCardContent />
    </AuthGuard>
  );
}

function MembershipCardContent() {
  const { getToken, isLoaded } = useAuth();
  const [application, setApplication] = useState<SsdIdApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  const loadApplication = useCallback(async () => {
    const token = await getToken();
    if (!token) throw new Error("Your Clerk session has expired. Please sign in again.");
    const response = await getMySsdIdApplications(token);
    const applications = Array.isArray(response.data) ? response.data : [];
    setApplication(applications[0] ?? null);
  }, [getToken]);

  useEffect(() => {
    if (!isLoaded) return;
    loadApplication().catch((error) => toast.error(error instanceof Error ? error.message : "Unable to load your SSD ID status")).finally(() => setLoading(false));
  }, [isLoaded, loadApplication]);

  const requestId = async () => {
    setApplying(true);
    try {
      const token = await getToken();
      if (!token) throw new Error("Your Clerk session has expired. Please sign in again.");
      const response = await applyForSsdId(token);
      setApplication(response.data);
      toast.success("SSD ID request submitted", { description: "Your request is now waiting for review." });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit your SSD ID request");
    } finally {
      setApplying(false);
    }
  };

  const downloadCard = async () => {
    if (!application?.id && !application?.ssd_id && !application?.card_id) return;
    try {
      const token = await getToken();
      if (!token) throw new Error("Your Clerk session has expired. Please sign in again.");
      const response = await getSsdIdDownloadUrl(token, application.id ?? application.ssd_id ?? application.card_id ?? "");
      const url = response.data.url ?? response.data.download_url;
      if (!url) throw new Error("The card download is not available yet.");
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to download your card");
    }
  };

  if (loading) return <div className="container flex min-h-[50vh] items-center justify-center gap-3"><Loader2 className="h-5 w-5 animate-spin" /> Loading your SSD ID status...</div>;

  const status = application?.status ?? "not_requested";
  const ssdId = application?.ssd_id ?? application?.membership_number;

  return (
    <main className="flex flex-col">
      <section className="border-b bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 md:py-20">
        <div className="container px-4 md:px-6"><h1 className="text-4xl font-bold">SSD ID Card</h1><p className="mt-2 text-muted-foreground">Your official Samta Sainik Dal digital identity</p></div>
      </section>
      <section className="py-12 md:py-16"><div className="container max-w-xl px-4 md:px-6">
        {!application || status === "not_requested" ? (
          <Card><CardHeader><CardTitle>Request your SSD ID</CardTitle><CardDescription>Every signed-in member can submit an ID card request for review.</CardDescription></CardHeader><CardContent><Button onClick={requestId} disabled={applying} className="w-full">{applying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CreditCard className="mr-2 h-4 w-4" />}Request SSD ID</Button></CardContent></Card>
        ) : status !== "approved" ? (
          <Card><CardHeader><CardTitle>SSD ID request {status}</CardTitle><CardDescription>Your request is being handled by the SSD team.</CardDescription></CardHeader><CardContent className="text-center"><Shield className="mx-auto mb-4 h-16 w-16 text-muted-foreground opacity-50" /><Badge variant="secondary" className="capitalize">{status}</Badge><p className="mt-4 text-sm text-muted-foreground">Your card will appear here after approval.</p></CardContent></Card>
        ) : (
          <Card className="overflow-hidden border-2 border-primary"><div className="bg-primary p-6 text-center text-primary-foreground"><Shield className="mx-auto mb-2 h-10 w-10" /><h2 className="text-2xl font-bold">Samta Sainik Dal Delhi</h2><p className="text-sm opacity-90">Official Member Identity</p></div><CardContent className="space-y-6 p-6 text-center"><div><p className="text-sm text-muted-foreground">SSD Member ID</p><p className="text-3xl font-black tracking-tight text-primary">{ssdId ?? "Pending"}</p></div><Badge>Approved</Badge><Button onClick={downloadCard} className="w-full"><Download className="mr-2 h-4 w-4" />Download ID Card</Button></CardContent></Card>
        )}
      </div></section>
    </main>
  );
}
