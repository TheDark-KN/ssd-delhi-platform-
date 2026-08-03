"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, Send, Save } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useFormPersistence } from "@/hooks/useFormPersistence";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const CONTACT_FORM_ID = "contact-form";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);

  const { save, load, clear, lastSaved } = useFormPersistence(CONTACT_FORM_ID);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const watchedValues = form.watch();

  useEffect(() => {
    const restoreDraft = async () => {
      const draft = await load();
      if (draft) {
        form.reset(draft as z.infer<typeof contactFormSchema>);
        setDraftRestored(true);
        setTimeout(() => setDraftRestored(false), 5000);
      }
    };
    restoreDraft();
  }, [load, form]);

  useEffect(() => {
    if (Object.keys(watchedValues).length > 0) {
      save(watchedValues as Record<string, unknown>);
    }
  }, [watchedValues, save]);

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    setIsSubmitting(true);
    try {
      console.log(values);
      toast.success("Message sent!", {
        description: "We'll get back to you soon.",
      });
      await clear();
      form.reset();
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 bg-[#4F46E5] overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#F59E0B]/20 blur-[120px] rounded-full" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl space-y-6">
            <Badge variant="outline" className="border-[#F59E0B] text-[#F59E0B] bg-[#F59E0B]/10 px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full">
              📞 Get in Touch
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
              Connect with <span className="text-[#F59E0B]">SSD Delhi</span>
            </h1>
            <p className="text-xl text-white/90 font-medium leading-relaxed max-w-2xl">
              Have questions? We&apos;re here to help and answer any questions you might have about the movement, membership, or our programs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <Card className="border-none shadow-2xl shadow-slate-100/60 rounded-[40px] overflow-hidden bg-white p-8 md:p-12">
              <div className="mb-6">
                <h2 className="text-3xl font-black text-[#4F46E5] mb-2">Send us a Message</h2>
                <p className="text-slate-500 font-medium">Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>

              {draftRestored && (
                <div className="mb-6 bg-success/10 border border-success/30 rounded-xl p-3 flex items-center gap-3">
                  <Save className="w-5 h-5 text-success flex-shrink-0" />
                  <p className="text-success text-sm font-medium">
                    Your previous message has been restored!
                  </p>
                </div>
              )}

              {lastSaved && !draftRestored && (
                <div className="mb-4 bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center gap-2 justify-center">
                  <Save className="w-4 h-4 text-slate-400" />
                  <p className="text-slate-500 text-xs">
                    Auto-saved at {lastSaved.toLocaleTimeString()}
                  </p>
                </div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-black text-[#64748B] uppercase tracking-widest">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} className="rounded-2xl border-slate-100 bg-slate-50 py-6 focus:ring-[#F59E0B]" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-black text-[#64748B] uppercase tracking-widest">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} className="rounded-2xl border-slate-100 bg-slate-50 py-6 focus:ring-[#F59E0B]" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black text-[#64748B] uppercase tracking-widest">Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" {...field} className="rounded-2xl border-slate-100 bg-slate-50 py-6 focus:ring-[#F59E0B]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black text-[#64748B] uppercase tracking-widest">Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="What is this regarding?" {...field} className="rounded-2xl border-slate-100 bg-slate-50 py-6 focus:ring-[#F59E0B]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black text-[#64748B] uppercase tracking-widest">Message</FormLabel>
                        <FormControl>
                          <textarea
                            className="w-full min-h-[150px] px-5 py-4 border-2 border-slate-50 rounded-2xl bg-slate-50 focus:outline-none focus:border-[#F59E0B]/30 focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-400"
                            placeholder="Your message..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full py-7 bg-[#F59E0B] hover:bg-[#D97706] rounded-2xl text-white font-black uppercase tracking-widest shadow-xl shadow-[#F59E0B]/20" disabled={isSubmitting}>
                    <Send className="h-5 w-5 mr-3" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Get in touch with SSD Delhi through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-semibold">Address</div>
                      <div className="text-muted-foreground">
                        Samta Sainik Dal Delhi<br />
                        New Delhi, India
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <a href="mailto:info@ssddelhi.org" className="text-primary hover:underline">
                        info@ssddelhi.org
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-semibold">Phone</div>
                      <a href="tel:+911112345678" className="text-primary hover:underline">
                        +91 11 1234 5678
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-semibold">Office Hours</div>
                      <div className="text-muted-foreground">
                        Monday - Saturday: 10:00 AM - 6:00 PM<br />
                        Sunday: Closed
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                  <CardDescription>
                    Stay connected on social media
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Facebook
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Twitter
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Instagram
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      YouTube
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
