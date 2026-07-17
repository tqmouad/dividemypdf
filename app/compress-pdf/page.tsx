import type { Metadata } from "next";
import { CompressTool } from "@/components/tools/CompressTool";

export const metadata: Metadata = {
  title: "Compress PDF Online Free",
  description: "Reduce your PDF file size online for free. Browser-based compression with no uploads or registration.",
  alternates: { canonical: "/compress-pdf" },
};

export default function CompressPdfPage() {
  return (
    <section className="pt-16 pb-16 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-5xl font-bold tracking-tight text-text sm:text-6xl">Compress PDF Online</h1>
        <p className="mt-5 text-lg text-text-secondary">
          Shrink your PDF file size in your browser. Savings vary by document — text-heavy PDFs compress best.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-[1280px] px-6">
        <CompressTool />
      </div>
    </section>
  );
}
