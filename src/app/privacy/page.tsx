import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Samta Sainik Dal Delhi",
  description: "Privacy Policy for Samta Sainik Dal Delhi - How we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-[#003285] px-4 py-16 text-white md:px-6 md:py-24">
        <div className="container relative">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-[#FFDA78]">Samta Sainik Dal Delhi</p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">Privacy Policy</h1>
            <p className="mt-4 text-lg font-medium leading-relaxed text-blue-100">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="prose prose-slate max-w-none">
            <p className="lead text-slate-600 mb-8">
              Samta Sainik Dal (SSD) Delhi respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>samtasainikdal.org</strong>.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">1. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">a) Personal Information</h3>
            <p className="text-slate-600 mb-4">
              We may collect personally identifiable information when you voluntarily provide it through:
            </p>
            <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
              <li>Membership application forms</li>
              <li>Event registration forms</li>
              <li>Contact forms</li>
              <li>Newsletter subscriptions</li>
              <li>Account creation for member dashboard</li>
            </ul>
            <p className="text-slate-600 mb-4">
              This may include: name, email address, phone number, address, date of birth, Aadhaar number (for membership verification), profile photo, and membership details.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">b) Non-Personal Information</h3>
            <p className="text-slate-600 mb-4">
              We automatically collect certain non-personal information when you visit our Website, including:
            </p>
            <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
              <li>IP address and browser type</li>
              <li>Operating system and device information</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
              <li>Geographic location (country/city level)</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">c) Cookies and Tracking Technologies</h3>
            <p className="text-slate-600 mb-4">
              We use cookies and similar tracking technologies to enhance your experience, analyze website traffic, and remember your preferences. You can control cookies through your browser settings.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">2. How We Use Your Information</h2>
            <p className="text-slate-600 mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
              <li>Process membership applications and manage member records</li>
              <li>Register and manage event participation</li>
              <li>Send communications about SSD Delhi activities, events, and updates</li>
              <li>Improve our Website and user experience</li>
              <li>Comply with legal obligations and regulatory requirements</li>
              <li>Verify identity for membership and event access</li>
              <li>Generate membership cards and certificates</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">3. Data Sharing and Disclosure</h2>
            <p className="text-slate-600 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
              <li><strong>With your consent:</strong> When you explicitly authorize us to share information</li>
              <li><strong>Service providers:</strong> Third-party vendors who perform services on our behalf (e.g., hosting, email delivery, payment processing) under strict confidentiality agreements</li>
              <li><strong>Legal requirements:</strong> When required by law, court order, or government regulation</li>
              <li><strong>Safety and security:</strong> To protect the rights, property, or safety of SSD Delhi, our members, or the public</li>
              <li><strong>Organizational affiliates:</strong> With All India Samta Sainik Dal for membership verification and coordination</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">4. Data Security</h2>
            <p className="text-slate-600 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These include:
            </p>
            <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure database storage with access controls</li>
              <li>Regular security assessments</li>
              <li>Limited access to personal data on a need-to-know basis</li>
            </ul>
            <p className="text-slate-600 mb-4">
              However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">5. Data Retention</h2>
            <p className="text-slate-600 mb-4">
              We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. Membership records are retained for the duration of membership plus 7 years after termination. Event registration data is retained for 3 years after the event.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">6. Your Rights</h2>
            <p className="text-slate-600 mb-4">
              Under applicable data protection laws, you have the right to:
            </p>
            <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
              <li>Access your personal information</li>
              <li>Rectify inaccurate or incomplete data</li>
              <li>Request deletion of your data (subject to legal obligations)</li>
              <li>Restrict or object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="text-slate-600 mb-4">
              To exercise these rights, contact us at <strong>info@ssddelhi.org</strong>.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">7. Children's Privacy</h2>
            <p className="text-slate-600 mb-4">
              Our Website is not directed to children under 18. We do not knowingly collect personal information from children under 18 without verifiable parental consent. If you believe we have collected information from a child, please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">8. Third-Party Links</h2>
            <p className="text-slate-600 mb-4">
              Our Website may contain links to third-party websites (e.g., social media, partner organizations). We are not responsible for the privacy practices or content of these external sites. Please review their privacy policies.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">9. Analytics</h2>
            <p className="text-slate-600 mb-4">
              We use Vercel Analytics to understand how visitors interact with our Website. This data is aggregated and anonymized. We do not use this data to personally identify you.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">10. Changes to This Policy</h2>
            <p className="text-slate-600 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated "Last updated" date. We encourage you to review this policy periodically.
            </p>

            <h2 className="text-2xl font-bold text-[#003285] mb-4 mt-8">11. Contact Us</h2>
            <p className="text-slate-600 mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact:
            </p>
            <address className="not-italic text-slate-600 mb-8">
              <p><strong>Data Protection Officer</strong></p>
              <p>Samta Sainik Dal Delhi</p>
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