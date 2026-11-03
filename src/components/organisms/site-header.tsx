"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Icon } from "@/components/atoms/icon";
import { Logo } from "@/components/atoms/logo";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  className?: string;
  /** desktop/mobile force viewport chrome; journey = Figma personalize/review/success nav */
  variant?: "desktop" | "mobile" | "journey";
};

/**
 * Figma «ترويسة-سطح-المكتب» / «ترويسة-تطبيق»
 * No outer border-radius. White surface + bottom hairline only.
 */
export function SiteHeader({ className, variant }: SiteHeaderProps) {
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const tCommon = useTranslations("Common");
  const [open, setOpen] = useState(false);
  const isJourney = variant === "journey";
  const forceMobile = variant === "mobile";
  const forceDesktop = variant === "desktop";

  const desktopNav = [
    { href: "/", label: t("home") },
    { href: "/#services", label: t("services") },
    { href: "/gifts", label: t("gifts") },
    { href: "/#packages", label: t("packages") },
    { href: "/#spa", label: t("spa") },
    { href: "/#about", label: t("about") },
  ] as const;

  const journeyNav = [
    { href: "/gifts", label: t("gifts") },
    { href: "/", label: t("home") },
  ] as const;

  const appNav = [
    { href: "/", label: t("start") },
    { href: "/gifts", label: t("gifts") },
    { href: "/design-system", label: t("designSystem") },
    { href: "/compare", label: t("compare") },
  ] as const;

  const links = isJourney ? journeyNav : desktopNav;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 rounded-none border-b border-border-subtle bg-bg-surface",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto h-16 max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-12",
          forceMobile
            ? "hidden"
            : forceDesktop || isJourney
              ? "flex"
              : "hidden md:flex"
        )}
      >
        <Logo className="h-10 w-auto" />
        <nav className="flex items-center gap-6" aria-label={t("mainAria")}>
          {links.map((item) => {
            const active =
              item.href === "/gifts"
                ? pathname.startsWith("/gifts")
                : pathname === item.href;
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  "text-[13px] leading-[18px] transition-colors",
                  active
                    ? "font-bold text-brand-olive"
                    : "font-normal text-text-primary hover:text-brand-olive"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div
        className={cn(
          "mx-auto flex h-[54px] max-w-6xl items-center justify-between px-4",
          forceDesktop || isJourney
            ? "hidden"
            : forceMobile
              ? "flex"
              : "flex md:hidden"
        )}
      >
        <Logo className="h-[34px] w-auto" />
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-none text-text-primary"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? tCommon("closeMenu") : tCommon("openMenu")}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>

      {open && !forceDesktop && !isJourney ? (
        <nav
          id="mobile-nav"
          className={cn(
            "border-t border-border-subtle bg-bg-surface px-4 py-3 md:hidden",
            forceMobile && "block"
          )}
          aria-label={t("mobileAria")}
        >
          <ul className="flex flex-col gap-1 text-start">
            {appNav.map((item) => {
              const active =
                item.href === "/gifts"
                  ? pathname.startsWith("/gifts")
                  : pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-xl px-3 py-2.5 text-button transition-colors",
                      active
                        ? "bg-bg-muted font-bold text-brand-olive"
                        : "text-text-secondary hover:bg-bg-muted hover:text-text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
