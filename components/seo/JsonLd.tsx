import { APP_CONFIG } from "@/lib/config/limits";

const FAQ_ITEMS = [
  ["How does DivideMyPDF work?", "It splits your PDF into individual one-page PDF files entirely inside your browser."],
  ["Is it free?", "Yes, splitting PDFs is completely free, with no hidden costs."],
  ["Do you store my files?", "No. Files are processed locally in your browser and are never uploaded or stored."],
];

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: APP_CONFIG.name,
        url: APP_CONFIG.domain,
      },
      {
        "@type": "WebSite",
        name: APP_CONFIG.name,
        url: APP_CONFIG.domain,
      },
      {
        "@type": "SoftwareApplication",
        name: `${APP_CONFIG.name} — Split PDF`,
        applicationCategory: "Utility",
        operatingSystem: "Any (runs in browser)",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        url: `${APP_CONFIG.domain}/split-pdf`,
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
