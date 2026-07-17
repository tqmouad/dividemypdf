import type { Metadata } from "next";
import { APP_CONFIG } from "@/lib/config/limits";

export const metadata: Metadata = {
  title: "About DivideMyPDF — Free Browser-Based PDF Tools",
  description:
    "Learn how DivideMyPDF splits, merges, compresses, and converts PDFs entirely in your browser — free, private, and without uploads.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold text-text">About {APP_CONFIG.name}</h1>

      <p className="mt-4 text-text-secondary">
        {APP_CONFIG.name} is a free, browser-based PDF toolkit built around one idea: working with PDFs
        shouldn&apos;t require installing software, creating an account, or uploading your documents to
        someone else&apos;s server. Every tool on this site — split PDF, merge PDF, compress PDF, delete
        pages, convert Word to PDF, and convert images to PDF — runs entirely on your own device.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-text">Why We Built an Online PDF Splitter</h2>
      <p className="mt-2 text-text-secondary">
        Splitting a PDF into individual pages is one of the most common document tasks — separating
        invoices, dividing lecture notes, or pulling a single signed page out of a longer contract.
        Most online PDF splitters ask you to upload your file to a remote server first. We built
        DivideMyPDF to skip that step entirely: your PDF is parsed, split, and zipped directly inside
        your browser, so the file never leaves your computer.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-text">A Growing PDF Toolkit</h2>
      <p className="mt-2 text-text-secondary">
        Split PDF was our first tool. Since then we&apos;ve added Merge PDF for combining multiple files,
        Compress PDF for reducing file size, Delete Pages for trimming unwanted pages, and both Word to
        PDF and Images to PDF for quick, free format conversion — all using the same private,
        browser-based approach.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-text">Who Uses DivideMyPDF</h2>
      <p className="mt-2 text-text-secondary">
        Students, teachers, lawyers, HR professionals, accountants, freelancers, and businesses of every
        size use DivideMyPDF to split, merge, compress, and convert PDFs online — for free, without
        registration, and without sending sensitive documents anywhere.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-text">Our Commitment to Privacy</h2>
      <p className="mt-2 text-text-secondary">
        No file uploads. No document storage. No account required. Every PDF tool on this site processes
        your files locally, in your browser, and nowhere else. Read more on our{" "}
        <a href="/privacy" className="text-primary underline">
          Privacy Policy
        </a>{" "}
        page.
      </p>
    </div>
  );
}
