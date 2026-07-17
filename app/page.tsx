import type { Metadata } from "next";
import { SplitTool } from "@/components/split/SplitTool";
import { Hero, Benefits, HowItWorks, Features, FAQ, Statistics, ToolsGrid, SeoContent } from "@/components/common/MarketingSections";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Split PDF Online Free",
  description: "Split PDF into individual pages online for free. Fast, secure, browser-based processing with no uploads or registration.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <section className="pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <SplitTool />
        </div>
      </section>
      <Benefits />
      <HowItWorks />
      <Features />
      <FAQ />
      <Statistics />
      <ToolsGrid />
      <SeoContent />
    </>
  );
}
