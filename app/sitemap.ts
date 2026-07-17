import type { MetadataRoute } from "next";
import { APP_CONFIG } from "@/lib/config/limits";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "", "/split-pdf", "/merge-pdf", "/compress-pdf", "/delete-pages",
    "/word-to-pdf", "/images-to-pdf", "/about", "/privacy",
  ];
  return routes.map((route) => ({
    url: `${APP_CONFIG.domain}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
