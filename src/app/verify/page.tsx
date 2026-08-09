"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { Shield, Mail, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function VerifyPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"code" | "complete">("code");

  const isEmailVerification = searchParams.get("email_verification") === "true";

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded || !signUp) return;

    setIsLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Email verified! Welcome to SSD Delhi.");
        router.push("/dashboard");
      } else {
        toast.error("Invalid or expired code. Please try again.");
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      toast.error(error.errors?.[0]?.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResend() {
    if (!isLoaded || !signUp) return;

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      toast.info("New verification code sent!");
    } catch (error: any) {
      toast.error("Failed to resend code");
    }
  }

  if (step === "complete") {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-[#003285]">Email Verified!</h1>
          <p className="text-muted-foreground mt-2">Redirecting to dashboard...</p>
          <Loader2 className="h-8 w-8 animate-spin mx-auto mt-6 text-[#003285]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#003285] shadow-lg mb-4">
            <Shield className="h-8 w-8 text-[#FFDA78]" />
          </div>
          <h1 className="text-3xl font-bold text-[#003285]">Verify Your Email</h1>
          <p className="text-muted-foreground mt-2">
            We sent a 6-digit code to your email address
          </p>
        </div>

        <Card className="border-primary/20 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Enter Verification Code</CardTitle>
            <CardDescription>Check your inbox (and spam folder)</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="code"
                    name="code"
                    type="text"
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="pl-10 text-center text-2xl tracking-widest"
                    required
                    disabled={isLoading}
                    maxLength={6}
                    autoComplete="one-time-code"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#003285] hover:bg-[#00286c] text-white font-semibold"
                disabled={isLoading || code.length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleResend}
                disabled={isLoading}
                className="text-[#003285] hover:text-[#00286c]"
              >
                Didn't receive a code? Resend
              </Button>
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Already verified?{" "}
                <a
                  href="/sign-in"
                  className="text-[#003285] font-semibold hover:underline"
                >
                  Sign In
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}