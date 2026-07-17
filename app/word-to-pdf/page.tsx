import type { Metadata } from "next";
import { WordToPdfTool } from "@/components/tools/WordToPdfTool";

export const metadata: Metadata = {
  title: "Word to PDF Converter Online Free",
  description: "Convert Word (.docx) documents to PDF online for free, directly in your browser.",
  alternates: { canonical: "/word-to-pdf" },
};

export default function WordToPdfPage() {
  return (
    <section className="pt-16 pb-16 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-5xl font-bold tracking-tight text-text sm:text-6xl">Word to PDF Converter</h1>
        <p className="mt-5 text-lg text-text-secondary">
          Convert your .docx document into a PDF, processed locally in your browser.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-[1280px] px-6">
        <WordToPdfTool />
      </div>
    </section>
  );
}
