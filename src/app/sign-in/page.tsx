"use client";

import { SignIn } from "@clerk/nextjs";

const appearance = {
  variables: {
    colorPrimary: "#003285",
    colorText: "#16324F",
    colorTextSecondary: "#5D7288",
    colorBackground: "#FFFFFF",
    colorInputBackground: "#F5F8FB",
    borderRadius: "0.75rem",
    fontFamily: "var(--font-inter), sans-serif",
  },
  elements: {
    rootBox: "w-full",
    card: "w-full rounded-2xl border border-primary/20 shadow-xl",
    headerTitle: "font-serif text-2xl text-[#003285]",
    headerSubtitle: "text-muted-foreground",
    formButtonPrimary: "bg-[#003285] hover:bg-[#00286c] rounded-xl font-semibold",
    formFieldInput: "rounded-xl border-slate-200 bg-slate-50 focus:border-[#003285] focus:ring-[#003285]",
    footerActionLink: "text-[#003285] hover:text-[#00286c]",
  },
};

export default function SignInPage() {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-12">
      <SignIn
        appearance={appearance}
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/dashboard"
        forceRedirectUrl="/dashboard"
      />
    </main>
  );
}
