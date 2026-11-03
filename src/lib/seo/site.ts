import { routing, type AppLocale } from "@/i18n/routing";

/** Production fallback used when env vars are missing (interview deploy). */
export const FALLBACK_SITE_URL = "https://yallah-spa-1gai.vercel.app";

export const SITE_NAME = "Yallah Spa";
export const SITE_NAME_AR = "يلا سبا";
export const TWITTER_HANDLE = undefined;

/** Absolute site origin without trailing slash. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (prod) return `https://${prod.replace(/\/$/, "")}`;

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return FALLBACK_SITE_URL;
}

export const DEFAULT_OG_IMAGE = "/assets/images/hero-gift.jpg";

/** Path without locale prefix (as-needed: ar has no prefix). */
export function localizedPath(locale: string, path: string): string {
  const normalized = path === "/" ? "/" : path.replace(/\/$/, "") || "/";
  if (locale === routing.defaultLocale) return normalized;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function absoluteUrl(locale: string, path: string): string {
  return `${getSiteUrl()}${localizedPath(locale, path)}`;
}

export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(locale, path);
  }
  languages["x-default"] = absoluteUrl(routing.defaultLocale, path);
  return languages;
}

export type SeoPageKey =
  | "home"
  | "gifts"
  | "giftsSearch"
  | "giftsPersonalize"
  | "giftsReview"
  | "giftsSuccess"
  | "compare"
  | "designSystem";

export const SEO_ROUTES: {
  key: SeoPageKey;
  path: string;
  /** Include in sitemap.xml */
  sitemap: boolean;
  /** Allow indexing */
  index: boolean;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
  priority?: number;
}[] = [
  { key: "home", path: "/", sitemap: true, index: true, changeFrequency: "weekly", priority: 1 },
  {
    key: "gifts",
    path: "/gifts",
    sitemap: true,
    index: true,
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    key: "giftsSearch",
    path: "/gifts/search",
    sitemap: true,
    index: true,
    changeFrequency: "weekly",
    priority: 0.85,
  },
  {
    key: "giftsPersonalize",
    path: "/gifts/personalize",
    sitemap: false,
    index: false,
  },
  {
    key: "giftsReview",
    path: "/gifts/review",
    sitemap: false,
    index: false,
  },
  {
    key: "giftsSuccess",
    path: "/gifts/success",
    sitemap: false,
    index: false,
  },
  {
    key: "compare",
    path: "/compare",
    sitemap: true,
    index: true,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    key: "designSystem",
    path: "/design-system",
    sitemap: false,
    index: false,
  },
];

export function isAppLocale(value: string): value is AppLocale {
  return (routing.locales as readonly string[]).includes(value);
}
