"use client";

import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { listArticles, listEvents } from "@/lib/supabase-rest";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileText,
  Calendar,
  TrendingUp,
  Plus,
  Settings,
  UserCheck,
  MessageSquare,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { AuthGuard } from "@/components/auth-guard";

export default function AdminDashboardPage() {
  return (
    <AuthGuard
      requiredRole="admin"
      title="SSD Admin Portal"
      description="Administrator credentials required to access system settings, member approvals, and publications."
    >
      <AdminContent />
    </AuthGuard>
  );
}

function AdminContent() {
  const currentUser = useQuery(api.users.getCurrentUser);
  const isLoadingUser = currentUser === undefined;
  const isAdmin = currentUser?.role === "admin" || currentUser?.role === "superadmin";
  const users = useQuery(api.users.listUsers as any, isAdmin ? { limit: 100 } : "skip");
  const [articles, setArticles] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (!isAdmin) return;
    Promise.all([listArticles(), listEvents()]).then(([nextArticles, nextEvents]) => {
      setArticles(nextArticles);
      setEvents(nextEvents);
    }).catch(() => {
      setArticles([]);
      setEvents([]);
    });
  }, [isAdmin]);
  const pendingMembers = useQuery(api.users.listUsers as any, isAdmin ? {
    membershipStatus: "pending",
    limit: 50
  } : "skip");
  const contactMessages = useQuery(api.contactMessages.list as any, isAdmin ? { limit: 10 } : "skip");

  if (isLoadingUser) {
    return <div className="flex min-h-[70vh] items-center justify-center text-muted-foreground font-bold">Checking administrator access…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-16">
        <Card className="w-full max-w-xl border-0 text-center shadow-xl rounded-3xl p-6">
          <CardContent className="space-y-5 p-6 md:p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FF7F3E]/10 text-[#FF7F3E]"><ShieldAlert className="h-10 w-10" /></div>
            <h1 className="text-3xl font-black text-[#003285]">Administrator Access Only</h1>
            <p className="text-base leading-relaxed text-slate-600">This SSD administration portal is restricted to authorized officers and administrators.</p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link href="/sign-in?redirect_url=%2Fadmin"><Button className="bg-[#003285] text-white hover:bg-[#002561] rounded-full px-6">Sign In with Admin Account</Button></Link>
              <Link href="/"><Button variant="outline" className="rounded-full px-6">Return to Website</Button></Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = {
    totalUsers: users?.length || 0,
    totalArticles: articles?.length || 0,
    totalEvents: events?.length || 0,
    pendingMembers: pendingMembers?.length || 0,
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage SSD Delhi platform content and members
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/admin/settings">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Registered members
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Articles</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalArticles}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Published articles
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalEvents}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total events
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Members</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.pendingMembers}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Awaiting approval
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/admin/articles/new">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <Plus className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>New Article</CardTitle>
                    <CardDescription>
                      Create a new article
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/admin/events/new">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <Calendar className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>New Event</CardTitle>
                    <CardDescription>
                      Create a new event
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/admin/members">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <UserCheck className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Approve Members</CardTitle>
                    <CardDescription>
                      Review pending applications
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/admin/news/new">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <MessageSquare className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Post News</CardTitle>
                    <CardDescription>
                      Share announcements
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>

          {/* Recent Content */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Recent Articles */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Articles</CardTitle>
                  <Link href="/admin/articles">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {!articles || articles.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No articles yet</p>
                ) : (
                  <div className="space-y-3">
                    {articles.slice(0, 5).map((article: any) => (
                      <div key={article._id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm line-clamp-1">{article.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {article.category} • {new Date(article.publishedAt || 0).toLocaleDateString()}
                          </div>
                        </div>
                        <Badge variant="outline">{article.language === "en" ? "EN" : "HI"}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pending Members */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pending Members</CardTitle>
                  <Link href="/admin/members">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {!pendingMembers || pendingMembers.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No pending applications</p>
                ) : (
                  <div className="space-y-3">
                    {pendingMembers.slice(0, 5).map((member: any) => (
                      <div key={member._id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.email}</div>
                        </div>
                        <Link href={`/admin/members/${member._id}`}>
                          <Button variant="outline" size="sm">Review</Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Contact Messages</CardTitle>
                  <Badge variant="outline">{contactMessages?.length || 0} recent</Badge>
                </div>
                <CardDescription>Messages submitted through the public contact form</CardDescription>
              </CardHeader>
              <CardContent>
                {!contactMessages?.length ? <p className="text-sm text-muted-foreground">No messages yet</p> : (
                  <div className="space-y-4">
                    {contactMessages?.slice(0, 5).map((message: any) => (
                      <div key={message._id} className="rounded-xl border p-3">
                        <div className="flex items-start justify-between gap-3"><div className="font-semibold text-sm">{message.subject}</div><Badge variant={message.status === "new" ? "default" : "outline"}>{message.status}</Badge></div>
                        <div className="mt-1 text-xs text-muted-foreground">{message.name} • {message.email}</div>
                        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{message.message}</p>
                        <div className="mt-1 text-xs text-muted-foreground">{new Date(message.submittedAt || 0).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
