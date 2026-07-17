import Link from "next/link";
import { FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { APP_CONFIG } from "@/lib/config/limits";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-lg font-semibold text-text">
          <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
          {APP_CONFIG.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-6 text-sm text-text-secondary">
          <Link href="/" className="focus-ring rounded hover:text-text">Home</Link>
          <Link href="/split-pdf" className="focus-ring rounded hover:text-text">Split PDF</Link>
          <Link href="/merge-pdf" className="focus-ring rounded hover:text-text hidden lg:inline">Merge PDF</Link>
          <Link href="/compress-pdf" className="focus-ring rounded hover:text-text hidden lg:inline">Compress PDF</Link>
          <Link href="/about" className="focus-ring rounded hover:text-text">About</Link>
          <Link href="/privacy" className="focus-ring rounded hover:text-text">Privacy</Link>
        </nav>
      </Container>
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-bg-secondary py-12">
      <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-semibold text-text">{APP_CONFIG.name}</p>
          <p className="mt-2 text-sm text-text-secondary">{APP_CONFIG.tagline}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-text">Product</p>
          <ul className="mt-2 space-y-2 text-sm text-text-secondary">
            <li><Link href="/split-pdf" className="hover:text-text">Split PDF</Link></li>
            <li><Link href="/#future-tools" className="hover:text-text">Upcoming tools</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-text">Company</p>
          <ul className="mt-2 space-y-2 text-sm text-text-secondary">
            <li><Link href="/about" className="hover:text-text">About</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-text">Legal</p>
          <ul className="mt-2 space-y-2 text-sm text-text-secondary">
            <li><Link href="/privacy" className="hover:text-text">Privacy</Link></li>
          </ul>
        </div>
      </Container>
      <Container className="mt-10 border-t border-border pt-6 text-xs text-text-secondary">
        © {year} {APP_CONFIG.name}. All rights reserved.
      </Container>
    </footer>
  );
}
