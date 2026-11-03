import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/gifts/personalize",
          "/gifts/review",
          "/gifts/success",
          "/design-system",
          "/en/gifts/personalize",
          "/en/gifts/review",
          "/en/gifts/success",
          "/en/design-system",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
