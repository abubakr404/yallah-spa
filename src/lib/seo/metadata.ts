import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  DEFAULT_OG_IMAGE,
  getSiteUrl,
  languageAlternates,
  localizedPath,
  type SeoPageKey,
  SEO_ROUTES,
} from "@/lib/seo/site";

type BuildPageMetadataOptions = {
  locale: string;
  page: SeoPageKey;
  /** Override path used for canonical / hreflang (defaults from SEO_ROUTES). */
  path?: string;
  /** Extra title segment already localized, e.g. product name */
  titleOverride?: string;
  descriptionOverride?: string;
};

export async function buildPageMetadata({
  locale,
  page,
  path: pathOverride,
  titleOverride,
  descriptionOverride,
}: BuildPageMetadataOptions): Promise<Metadata> {
  const route = SEO_ROUTES.find((r) => r.key === page);
  const path = pathOverride ?? route?.path ?? "/";
  const indexable = route?.index ?? true;

  const t = await getTranslations({ locale, namespace: "Seo" });
  const title = titleOverride ?? t(`pages.${page}.title`);
  const description = descriptionOverride ?? t(`pages.${page}.description`);
  const keywordsRaw = t(`pages.${page}.keywords`);
  const keywords = keywordsRaw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}${localizedPath(locale, path)}`;
  const ogImage = `${siteUrl}${DEFAULT_OG_IMAGE}`;
  const siteName = t("siteName");
  const ogLocale = locale === "ar" ? "ar_SA" : "en_US";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    applicationName: siteName,
    authors: [{ name: "Abubakr" }],
    creator: "Abubakr",
    publisher: siteName,
    category: "spa",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: indexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        },
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      url: canonical,
      siteName,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    other: {
      "og:locale:alternate": locale === "ar" ? "en_US" : "ar_SA",
    },
  };
}

export async function buildRootMetadata(locale: string): Promise<Metadata> {
  const base = await buildPageMetadata({ locale, page: "home" });
  const t = await getTranslations({ locale, namespace: "Seo" });

  return {
    ...base,
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
  };
}
