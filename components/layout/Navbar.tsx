"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { APP_CONFIG } from "@/lib/config/limits";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/split-pdf", label: "Split PDF" },
  { href: "/merge-pdf", label: "Merge PDF" },
  { href: "/compress-pdf", label: "Compress PDF" },
  { href: "/delete-pages", label: "Delete Pages" },
  { href: "/word-to-pdf", label: "Word to PDF" },
  { href: "/images-to-pdf", label: "Images to PDF" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="focus-ring flex items-center gap-2 rounded-lg font-semibold text-text"
          onClick={() => setIsOpen(false)}
        >
          <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
          {APP_CONFIG.name}
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-5 text-sm text-text-secondary lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="focus-ring whitespace-nowrap rounded hover:text-text">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="focus-ring rounded-lg p-2 text-text lg:hidden"
        >
          {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </Container>

      {/* Mobile menu panel */}
      {isOpen && (
        <nav aria-label="Mobile" className="border-t border-border bg-white lg:hidden">
          <Container className="flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="focus-ring rounded px-2 py-3 text-base text-text-secondary hover:bg-bg-secondary hover:text-text"
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
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
            <li><Link href="/merge-pdf" className="hover:text-text">Merge PDF</Link></li>
            <li><Link href="/compress-pdf" className="hover:text-text">Compress PDF</Link></li>
            <li><Link href="/#tools" className="hover:text-text">All tools</Link></li>
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
