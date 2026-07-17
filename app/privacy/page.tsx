import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold text-text">Privacy Policy</h1>
      <p className="mt-4 text-text-secondary">
        DivideMyPDF processes every file entirely inside your browser. Your PDF is never uploaded,
        transmitted, or stored on any server. We have no access to your document contents.
      </p>
      <p className="mt-4 text-text-secondary">
        We may use privacy-friendly analytics to understand aggregate usage (such as how many PDFs are
        split), but this never includes the contents of your files.
      </p>
    </div>
  );
}
