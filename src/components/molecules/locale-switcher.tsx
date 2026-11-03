"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  className?: string;
};

/** Toggle between Arabic (default) and English, keeping the current path. */
export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Common");
  const nextLocale = locale === "ar" ? "en" : "ar";

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className={cn(
        "inline-flex h-9 items-center rounded-full border border-border-subtle bg-bg-muted px-3 text-[12px] font-medium text-brand-olive transition-colors hover:bg-bg-ivory",
        className
      )}
      aria-label={t("language")}
      hrefLang={nextLocale}
    >
      {nextLocale === "en" ? t("switchToEn") : t("switchToAr")}
    </Link>
  );
}
