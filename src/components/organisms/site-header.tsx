"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/atoms/icon";
import { Logo } from "@/components/atoms/logo";
import { cn } from "@/lib/utils";

const desktopNav = [
  { href: "/", label: "الرئيسية" },
  { href: "/#services", label: "خدماتنا" },
  { href: "/gifts", label: "الإهداء" },
  { href: "/#packages", label: "البكجات" },
  { href: "/#spa", label: "مركز سبا" },
  { href: "/#about", label: "من نحن" },
];

const journeyNav = [
  { href: "/gifts", label: "الإهداء" },
  { href: "/", label: "الرئيسية" },
];

const appNav = [
  { href: "/", label: "البداية" },
  { href: "/gifts", label: "الإهداء" },
  { href: "/design-system", label: "نظام التصميم" },
];

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
  const [open, setOpen] = useState(false);
  const isJourney = variant === "journey";
  const forceMobile = variant === "mobile";
  const forceDesktop = variant === "desktop";
  const links = isJourney ? journeyNav : desktopNav;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 rounded-none border-0 border-b border-border-subtle bg-bg-surface",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto h-16 max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-12",
          forceMobile ? "hidden" : forceDesktop || isJourney ? "flex" : "hidden md:flex"
        )}
      >
        <Logo className="h-10 w-auto" />
        <nav className="flex items-center gap-6" aria-label="التنقل الرئيسي">
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
          forceDesktop || isJourney ? "hidden" : forceMobile ? "flex" : "flex md:hidden"
        )}
      >
        <Logo className="h-[34px] w-auto" />
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-none text-text-primary"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
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
          aria-label="التنقل للموبايل"
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
