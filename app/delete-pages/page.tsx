import type { Metadata } from "next";
import { DeletePagesTool } from "@/components/tools/DeletePagesTool";

export const metadata: Metadata = {
  title: "Delete Pages From PDF Online Free",
  description: "Remove specific pages from a PDF online for free. Fast, secure, browser-based editing with no uploads.",
  alternates: { canonical: "/delete-pages" },
};

export default function DeletePagesPage() {
  return (
    <section className="pt-16 pb-16 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-5xl font-bold tracking-tight text-text sm:text-6xl">Delete Pages From a PDF</h1>
        <p className="mt-5 text-lg text-text-secondary">
          Upload a PDF, choose which pages to remove, and download the result — all in your browser.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-[1280px] px-6">
        <DeletePagesTool />
      </div>
    </section>
  );
}
