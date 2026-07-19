import { APP_CONFIG } from "@/lib/config/limits";
import { FAQS } from "@/components/common/MarketingSections";

interface JsonLdProps {
  /** Path of the current page, e.g. "/split-pdf". Omit for the homepage. */
  path?: string;
  /** Human name of the tool for this page, e.g. "Split PDF". Omit for the homepage. */
  toolName?: string;
  /** Include the FAQ schema (only do this if the visible FAQ section is actually rendered on this page). */
  includeFaq?: boolean;
}

/**
 * Renders shared + page-specific JSON-LD. Organization/WebSite are global;
 * SoftwareApplication + BreadcrumbList are generated per page so every
 * tool page (not just the homepage) carries accurate structured data.
 */
export function JsonLd({ path, toolName, includeFaq = true }: JsonLdProps) {
  const url = path ? `${APP_CONFIG.domain}${path}` : APP_CONFIG.domain;

  const breadcrumbItems = [
    { name: "Home", url: APP_CONFIG.domain },
    ...(toolName && path ? [{ name: toolName, url }] : []),
  ];

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      name: APP_CONFIG.name,
      url: APP_CONFIG.domain,
      logo: `${APP_CONFIG.domain}/icon-512.png`,
    },
    {
      "@type": "WebSite",
      name: APP_CONFIG.name,
      url: APP_CONFIG.domain,
    },
    {
      "@type": "SoftwareApplication",
      name: toolName ? `${APP_CONFIG.name} — ${toolName}` : APP_CONFIG.name,
      applicationCategory: "Utility",
      operatingSystem: "Any (runs in browser)",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      url,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    },
  ];

  if (includeFaq) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  const data = { "@context": "https://schema.org", "@graph": graph };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}