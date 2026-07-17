import type { Metadata } from "next";
import { SplitTool } from "@/components/split/SplitTool";
import { HowItWorks, Benefits, FAQ, ToolsGrid, SeoContent } from "@/components/common/MarketingSections";

export const metadata: Metadata = {
  title: "Split PDF Into Individual Pages Online",
  description:
    "Split PDF files into separate one-page PDFs in seconds. Everything happens inside your browser for maximum privacy and speed.",
  alternates: { canonical: "/split-pdf" },
};

export default function SplitPdfPage() {
  return (
    <>
      <section className="pt-16 pb-10 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-5xl font-bold tracking-tight text-text sm:text-6xl">Split PDF Into Individual Pages</h1>
          <p className="mt-5 text-lg text-text-secondary">
            Upload a PDF and get one file per page, ready to download as a ZIP — processed entirely in your browser.
          </p>
        </div>
      </section>
      <section className="pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <SplitTool />
        </div>
      </section>
      <Benefits />
      <HowItWorks />
      <FAQ />
      <ToolsGrid />
      <SeoContent />
    </>
  );
}
