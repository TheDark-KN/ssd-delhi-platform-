"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Calendar, CheckCircle, CreditCard, User, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMyMembershipStatus, getMyProfile, getMyRsvps, type SsdProfile } from "@/lib/ssd-api";
import { AuthGuard } from "@/components/auth-guard";

export default function DashboardPage() {
  return (
    <AuthGuard title="Sign In to Access Dashboard" description="View your SSD Delhi membership, events, and profile.">
      <DashboardContent />
    </AuthGuard>
  );
}

function DashboardContent() {
  const { getToken, isLoaded } = useAuth();
  const [profile, setProfile] = useState<SsdProfile | null>(null);
  const [rsvps, setRsvps] = useState<unknown[]>([]);
  const [membershipStatus, setMembershipStatus] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    let cancelled = false;
    async function loadDashboard() {
      try {
        const token = await getToken();
        if (!token) throw new Error("Your Clerk session has expired. Please sign in again.");
        const [profileResponse, rsvpResponse, statusResponse] = await Promise.all([
          getMyProfile(token),
          getMyRsvps(token),
          getMyMembershipStatus(token),
        ]);
        if (!cancelled) {
          setProfile(profileResponse.data);
          setRsvps(rsvpResponse.data ?? []);
          setMembershipStatus(statusResponse.data);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unable to load your dashboard.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadDashboard();
    return () => { cancelled = true; };
  }, [getToken, isLoaded]);

  if (loading) return <div className="container py-16 flex items-center justify-center gap-3"><Loader2 className="h-5 w-5 animate-spin" /> Loading your dashboard...</div>;
  if (error) return <div className="container py-16 text-center"><p className="text-destructive mb-4">{error}</p><Button onClick={() => window.location.reload()}>Try again</Button></div>;

  const name = profile?.full_name || profile?.email || "Member";
  const status = profile?.membership_status || (membershipStatus as { status?: string } | null)?.status || "pending";

  return (
    <main className="flex flex-col">
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b">
        <div className="container px-4 md:px-6 flex flex-wrap items-center justify-between gap-6">
          <div><h1 className="text-4xl font-bold">Welcome, {name}!</h1><p className="text-muted-foreground mt-2">Manage your SSD Delhi membership</p></div>
          <div className="flex gap-2"><Link href="/dashboard/membership-card"><Button><CreditCard className="h-4 w-4 mr-2" />Membership Card</Button></Link><Link href="/dashboard/profile"><Button variant="outline"><User className="h-4 w-4 mr-2" />Edit Profile</Button></Link></div>
        </div>
      </section>
      <section className="py-12 md:py-16"><div className="container px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Card><CardHeader><CardTitle className="text-sm">Membership Status</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold capitalize">{status}</div>{profile?.membership_number && <p className="text-xs text-muted-foreground mt-1">{profile.membership_number}</p>}</CardContent></Card>
          <Card><CardHeader><CardTitle className="text-sm">Events Registered</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{rsvps.length}</div><p className="text-xs text-muted-foreground mt-1">Your event RSVPs</p></CardContent></Card>
          <Card><CardHeader><CardTitle className="text-sm">Your Role</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold capitalize">{profile?.role || "user"}</div></CardContent></Card>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2"><Link href="/events"><Card className="hover:shadow-md transition-shadow"><CardHeader><Calendar className="h-8 w-8 text-primary mb-2" /><CardTitle>Browse Events</CardTitle><CardDescription>View and register for upcoming SSD events</CardDescription></CardHeader></Card></Link><Link href="/articles"><Card className="hover:shadow-md transition-shadow"><CardHeader><CheckCircle className="h-8 w-8 text-primary mb-2" /><CardTitle>Read Articles</CardTitle><CardDescription>Explore SSD history and ideology</CardDescription></CardHeader></Card></Link></div>
        {rsvps.length > 0 && <div className="mt-8"><h2 className="text-2xl font-bold mb-4">My RSVPs</h2><div className="grid gap-4 md:grid-cols-2">{rsvps.map((rsvp, index) => <Card key={index}><CardContent className="py-5"><Badge variant="secondary">Registered</Badge><p className="mt-2 text-sm">{String((rsvp as { event_title?: string; title?: string }).event_title || (rsvp as { title?: string }).title || "Event registration")}</p></CardContent></Card>)}</div></div>}
      </div></section>
    </main>
  );
}
