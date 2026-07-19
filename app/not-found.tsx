import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-text">Page not found</h1>
      <p className="mt-3 text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link href="/" className="mt-6 rounded-xl bg-primary px-5 py-2.5 font-medium text-white hover:scale-[1.02]">
        Go to Split PDF
      </Link>
    </div>
  );
}