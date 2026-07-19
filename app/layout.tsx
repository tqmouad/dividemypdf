import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Navbar, Footer } from "@/components/layout/Navbar";
import { APP_CONFIG } from "@/lib/config/limits";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.domain),
  applicationName: APP_CONFIG.name,
  title: {
    default: "Split PDF Online Free — No Sign-Up | DivideMyPDF",
    template: `%s | ${APP_CONFIG.name}`,
  },
  description:
    "Split any PDF into individual pages in seconds — 100% free, no sign-up, no software. Merge, compress, and convert PDFs too, all processed securely on your device.",
  keywords: [
    "split pdf",
    "split pdf online",
    "divide pdf",
    "pdf splitter",
    "merge pdf",
    "compress pdf",
    "delete pdf pages",
    "word to pdf",
    "images to pdf",
    "free pdf tools",
  ],
  authors: [{ name: APP_CONFIG.name }],
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: APP_CONFIG.domain,
  },
  openGraph: {
    title: "Split PDF Online Free — No Sign-Up | DivideMyPDF",
    description:
      "Split any PDF into individual pages in seconds — 100% free, no sign-up, no software required.",
    url: APP_CONFIG.domain,
    siteName: APP_CONFIG.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF Online Free — No Sign-Up | DivideMyPDF",
    description:
      "Split any PDF into individual pages in seconds — 100% free, no sign-up, no software required.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563EB",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}