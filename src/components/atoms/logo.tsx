"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string | null;
  priority?: boolean;
};

export function Logo({ className, href = "/", priority }: LogoProps) {
  const t = useTranslations("Common");
  const brand = t("brand");

  const mark = (
    <Image
      src="/assets/images/yallah-logo.png"
      alt={brand}
      width={160}
      height={56}
      priority={priority}
      className={cn("h-10 w-auto object-contain sm:h-14", className)}
    />
  );

  if (href === null) return mark;

  return (
    <Link href={href} className="inline-flex" aria-label={brand}>
      {mark}
    </Link>
  );
}
