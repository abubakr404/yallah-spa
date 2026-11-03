import { getTranslations } from "next-intl/server";
import {
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  getSiteUrl,
  SITE_NAME,
} from "@/lib/seo/site";

export async function buildWebsiteJsonLd(locale: string) {
  const t = await getTranslations({ locale, namespace: "Seo" });
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("siteName"),
    alternateName: [SITE_NAME, "يلا سبا"],
    url: absoluteUrl(locale, "/"),
    inLanguage: locale === "ar" ? "ar-SA" : "en-US",
    description: t("description"),
    publisher: {
      "@type": "Organization",
      name: t("siteName"),
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/images/yallah-logo.png`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl(locale, "/gifts/search")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export async function buildOrganizationJsonLd(locale: string) {
  const t = await getTranslations({ locale, namespace: "Seo" });
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t("siteName"),
    url: siteUrl,
    logo: `${siteUrl}/assets/images/yallah-logo.png`,
    description: t("description"),
    sameAs: [
      "https://github.com/abubakr404/yallah-spa",
      "https://www.figma.com/design/L4awvfGrnlcQqGOorNEYkw/Yallah-Spa-%E2%80%94-Gift-Page-Redesign",
    ],
  };
}

export async function buildWebPageJsonLd({
  locale,
  path,
  pageKey,
}: {
  locale: string;
  path: string;
  pageKey: string;
}) {
  const t = await getTranslations({ locale, namespace: "Seo" });
  const title = t(`pages.${pageKey}.title`);
  const description = t(`pages.${pageKey}.description`);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(locale, path),
    inLanguage: locale === "ar" ? "ar-SA" : "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: t("siteName"),
      url: absoluteUrl(locale, "/"),
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${getSiteUrl()}${DEFAULT_OG_IMAGE}`,
    },
  };
}

export async function buildBreadcrumbJsonLd(
  locale: string,
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}

export async function buildGiftServiceJsonLd(locale: string) {
  const t = await getTranslations({ locale, namespace: "Seo" });
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("pages.gifts.title"),
    description: t("pages.gifts.description"),
    provider: {
      "@type": "Organization",
      name: t("siteName"),
      url: getSiteUrl(),
    },
    areaServed: {
      "@type": "Country",
      name: locale === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia",
    },
    serviceType: locale === "ar" ? "إهداء جلسات وباقات سبا" : "Spa gift sessions and packages",
    url: absoluteUrl(locale, "/gifts"),
  };
}
