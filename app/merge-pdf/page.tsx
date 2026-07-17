import type { Metadata } from "next";
import { MergeTool } from "@/components/tools/MergeTool";

export const metadata: Metadata = {
  title: "Merge PDF Files Online Free",
  description: "Combine multiple PDF files into one document online, for free. Fast, secure, browser-based merging with no uploads.",
  alternates: { canonical: "/merge-pdf" },
};

export default function MergePdfPage() {
  return (
    <section className="pt-16 pb-16 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-5xl font-bold tracking-tight text-text sm:text-6xl">Merge PDF Files Online</h1>
        <p className="mt-5 text-lg text-text-secondary">
          Combine multiple PDFs into a single document in seconds — entirely inside your browser.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-[1280px] px-6">
        <MergeTool />
      </div>
    </section>
  );
}
