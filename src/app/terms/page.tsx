"use client";

import type { Metadata } from "next";
import { useLanguage } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Terms of Service | Samta Sainik Dal Delhi",
  description: "Terms of Service for Samta Sainik Dal Delhi - Soldiers for Equality.",
};

export default function TermsPage() {
  const { t, language } = useLanguage();
  const lastUpdated = new Date().toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-[#003285] px-4 py-16 text-white md:px-6 md:py-24">
        <div className="container relative">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-[#FFDA78]">Samta Sainik Dal Delhi</p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">Terms of Service</h1>
            <p className="mt-4 text-lg font-medium leading-relaxed text-blue-100">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="prose prose-slate max-w-none">
            <p className="lead text-slate-600 mb-8">
              Welcome to the official website of Samta Sainik Dal (SSD) Delhi. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this website.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">1. Acceptance of Terms</h2>
            <p className="text-slate-600 mb-4">
              By accessing <strong>samtasainikdal.org</strong> (the "Website"), you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our Website.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">2. Purpose of the Website</h2>
            <p className="text-slate-600 mb-4">
              This Website serves as the official digital presence of Samta Sainik Dal Delhi, providing information about our organization, history, ideology, events, news, and membership. The Website aims to promote the principles of equality, liberty, fraternity, and social justice as envisioned by Dr. B.R. Ambedkar.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">3. Intellectual Property</h2>
            <p className="text-slate-600 mb-4">
              All content on this Website, including text, graphics, logos, images, videos, and software, is the property of Samta Sainik Dal Delhi or its content suppliers and is protected by Indian and international copyright laws. You may not reproduce, distribute, modify, or create derivative works without prior written permission, except for personal, non-commercial use.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">4. User Conduct</h2>
            <p className="text-slate-600 mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
              <li>Use the Website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the Website</li>
              <li>Interfere with or disrupt the Website's functionality</li>
              <li>Post or transmit any content that is defamatory, offensive, or hateful</li>
              <li>Use the Website to promote discrimination based on caste, religion, gender, or any protected characteristic</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">5. Membership and Registration</h2>
            <p className="text-slate-600 mb-4">
              Certain features of the Website (such as event registration, membership applications, and dashboard access) require user registration. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. You are responsible for maintaining the confidentiality of your account credentials.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">6. Events and Registrations</h2>
            <p className="text-slate-600 mb-4">
              Event registrations through this Website are subject to availability and approval by SSD Delhi organizers. We reserve the right to cancel or modify events. Registration does not guarantee participation if capacity limits are reached or if the registrant does not meet eligibility criteria.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">7. Disclaimer of Warranties</h2>
            <p className="text-slate-600 mb-4">
              The Website is provided "as is" and "as available" without warranties of any kind, either express or implied. SSD Delhi does not warrant that the Website will be uninterrupted, error-free, or free of viruses. We make no representations about the accuracy or completeness of the content.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">8. Limitation of Liability</h2>
            <p className="text-slate-600 mb-4">
              To the fullest extent permitted by applicable law, Samta Sainik Dal Delhi shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of or inability to use the Website.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">9. Links to Third-Party Websites</h2>
            <p className="text-slate-600 mb-4">
              The Website may contain links to third-party websites. These links are provided for convenience only. SSD Delhi has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party websites.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">10. Modifications to Terms</h2>
            <p className="text-slate-600 mb-4">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the Website after any changes constitutes acceptance of the new Terms. Please review this page periodically.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">11. Governing Law</h2>
            <p className="text-slate-600 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Delhi, India.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">12. Contact Us</h2>
            <p className="text-slate-600 mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <address className="not-italic text-slate-600 mb-8">
              <p><strong>Samta Sainik Dal Delhi</strong></p>
              <p>Dr. Ambedkar Bhawan, Rani Jhansi Road</p>
              <p>Delhi - 110055, India</p>
              <p>Email: info@ssddelhi.org</p>
            </address>

            <hr className="my-8 border-slate-200" />
            <p className="text-sm text-slate-500 text-center">
              &copy; {new Date().getFullYear()} Samta Sainik Dal Delhi. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}