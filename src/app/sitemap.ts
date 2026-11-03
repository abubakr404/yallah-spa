import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import {
  absoluteUrl,
  getSiteUrl,
  languageAlternates,
  SEO_ROUTES,
} from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of SEO_ROUTES) {
    if (!route.sitemap) continue;

    for (const locale of routing.locales) {
      entries.push({
        url: absoluteUrl(locale, route.path),
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: languageAlternates(route.path),
        },
      });
    }
  }

  // Help crawlers discover the site root explicitly
  entries.unshift({
    url: getSiteUrl(),
    lastModified,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages: languageAlternates("/") },
  });

  // Deduplicate by URL
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
