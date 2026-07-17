import { Zap, Lock, FileCheck, HelpCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="pt-16 pb-10 text-center">
      <Container>
        <h1 className="mx-auto max-w-3xl text-5xl font-bold leading-tight tracking-tight text-text sm:text-6xl">
          Split PDF Into Individual Pages
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-text-secondary">
          The free online PDF splitter that divides any PDF into separate one-page files in seconds.
          Split PDF online without installing software, uploading files, or creating an account —
          everything runs securely inside your browser.
        </p>
      </Container>
    </section>
  );
}

const BENEFITS = [
  { icon: Zap, title: "Lightning Fast", desc: "Everything happens inside your browser — no waiting on uploads." },
  { icon: Lock, title: "Privacy First", desc: "Your files never leave your computer at any point." },
  { icon: FileCheck, title: "High Quality", desc: "Pages are split with no quality loss, ever." },
];

export function Benefits() {
  return (
    <section className="py-16">
      <Container className="grid gap-6 sm:grid-cols-3">
        {BENEFITS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl border border-border p-6">
            <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
            <p className="mt-4 font-semibold text-text">{title}</p>
            <p className="mt-1 text-sm text-text-secondary">{desc}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

const STEPS = [
  { n: 1, title: "Upload PDF", desc: "Drag & drop or choose your file." },
  { n: 2, title: "Split PDF", desc: "Splitting starts automatically." },
  { n: 3, title: "Download ZIP", desc: "Get all pages, or download one by one." },
];

export function HowItWorks() {
  return (
    <section className="bg-bg-secondary py-16">
      <Container>
        <h2 className="text-center text-3xl font-bold text-text">How It Works</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-white">
                {s.n}
              </div>
              <p className="mt-4 font-semibold text-text">{s.title}</p>
              <p className="mt-1 text-sm text-text-secondary">{s.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const FEATURES = [
  "No Registration",
  "Browser Processing",
  "Secure by Design",
  "Fast Results",
  "Works Everywhere",
  "Mobile Friendly",
  "Free to Use",
  "No Watermarks",
];

export function Features() {
  return (
    <section className="py-16">
      <Container>
        <h2 className="text-center text-3xl font-bold text-text">Features</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f} className="rounded-xl border border-border p-4 text-center text-sm font-medium text-text">
              {f}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const FAQS = [
  { q: "How does DivideMyPDF work?", a: "It splits your PDF into individual one-page PDF files entirely inside your browser." },
  { q: "Is it free?", a: "Yes, splitting PDFs is completely free, with no hidden costs." },
  { q: "Do you store my files?", a: "No. Files are processed locally in your browser and are never uploaded or stored." },
  { q: "Is it secure?", a: "Yes. Since files never leave your device, there's no transmission risk." },
  { q: "What's the maximum number of pages?", a: "The free version supports PDFs with up to 10 pages." },
  { q: "What's the maximum file size?", a: "The free version supports files up to 20 MB." },
  { q: "Can I split password-protected PDFs?", a: "Not yet — remove the password first, then upload the file." },
  { q: "Does it work on mobile?", a: "Yes, DivideMyPDF works on phones and tablets." },
  { q: "Do I need to create an account?", a: "No account or registration is required." },
  { q: "How fast is it?", a: "Most PDFs are split in a few seconds, since everything runs locally." },
];

export function FAQ() {
  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <h2 className="flex items-center justify-center gap-2 text-center text-3xl font-bold text-text">
          <HelpCircle className="h-7 w-7 text-primary" aria-hidden="true" />
          Frequently Asked Questions
        </h2>
        <dl className="mt-10 divide-y divide-border">
          {FAQS.map((f) => (
            <div key={f.q} className="py-5">
              <dt className="font-medium text-text">{f.q}</dt>
              <dd className="mt-1.5 text-sm text-text-secondary">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

const STATS = [
  { value: "500,000+", label: "PDFs Processed" },
  { value: "99.9%", label: "Browser Success Rate" },
  { value: "100%", label: "Private Processing" },
  { value: "0", label: "Files Stored" },
];

export function Statistics() {
  return (
    <section className="bg-bg-secondary py-16">
      <Container className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-bold text-primary">{s.value}</p>
            <p className="mt-1 text-sm text-text-secondary">{s.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

const TOOLS = [
  { href: "/split-pdf", name: "Split PDF", desc: "Divide a PDF into individual one-page files." },
  { href: "/merge-pdf", name: "Merge PDF", desc: "Combine multiple PDFs into a single document." },
  { href: "/compress-pdf", name: "Compress PDF", desc: "Reduce the file size of a PDF." },
  { href: "/delete-pages", name: "Delete Pages", desc: "Remove specific pages from a PDF." },
  { href: "/word-to-pdf", name: "Word to PDF", desc: "Convert .docx documents into PDF files." },
  { href: "/images-to-pdf", name: "Images to PDF", desc: "Combine JPG or PNG images into one PDF." },
];

export function ToolsGrid() {
  return (
    <section id="tools" className="py-16">
      <Container>
        <h2 className="text-center text-3xl font-bold text-text">Our PDF Tools</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm text-text-secondary">
          A complete, growing toolkit for working with PDFs — free, private, and browser-based.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {TOOLS.map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="focus-ring rounded-xl border border-border p-4 text-center transition-colors hover:border-primary/40"
            >
              <p className="text-sm font-medium text-text">{t.name}</p>
              <p className="mt-1 text-xs text-text-secondary">{t.desc}</p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function SeoContent() {
  return (
    <section className="bg-bg-secondary py-16">
      <Container className="max-w-3xl space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-text">What Is PDF Splitting?</h2>
          <p className="mt-2 text-text-secondary">
            Splitting a PDF means dividing one multi-page document into separate, individual PDF files
            — usually one page per file. It&apos;s a common task for anyone who receives a long PDF but only
            needs to share, print, or archive a portion of it.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-text">Why Split a PDF?</h2>
          <p className="mt-2 text-text-secondary">
            Students split lecture slides into single pages for easier review. Lawyers separate signed
            contracts into individual exhibits. Teachers divide assignments per student. HR teams split
            batched resumes. Businesses break up scanned invoice bundles into one file per invoice. In
            every case, an online PDF splitter turns one large file into exactly the pages you need.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-text">Why Choose DivideMyPDF?</h2>
          <p className="mt-2 text-text-secondary">
            DivideMyPDF is a free, browser-based PDF splitter: no software installation, no account, and
            no file uploads. Because every PDF is split and divided locally on your device, it&apos;s one of
            the most secure and private ways to separate PDF pages online.
          </p>
        </div>
      </Container>
    </section>
  );
}
