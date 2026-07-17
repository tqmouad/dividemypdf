import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout/Navbar";
import { APP_CONFIG } from "@/lib/config/limits";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.domain),
  title: { default: `Split PDF Online Free | ${APP_CONFIG.name}`, template: `%s | ${APP_CONFIG.name}` },
  description: "Split PDF into individual pages online for free. Fast, secure, browser-based processing with no uploads or registration.",
  openGraph: { siteName: APP_CONFIG.name, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
