import type { Metadata } from "next";
import { ImagesToPdfTool } from "@/components/tools/ImagesToPdfTool";

export const metadata: Metadata = {
  title: "Images to PDF Converter Online Free",
  description: "Combine JPG or PNG images into a single PDF online for free, directly in your browser.",
  alternates: { canonical: "/images-to-pdf" },
};

export default function ImagesToPdfPage() {
  return (
    <section className="pt-16 pb-16 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-5xl font-bold tracking-tight text-text sm:text-6xl">Images to PDF Converter</h1>
        <p className="mt-5 text-lg text-text-secondary">
          Combine one or more JPG or PNG images into a single PDF file — no uploads required.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-[1280px] px-6">
        <ImagesToPdfTool />
      </div>
    </section>
  );
}
