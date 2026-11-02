"use client";

import type { ComponentProps } from "react";
import { Icon } from "@/components/atoms/icon";
import { cn } from "@/lib/utils";

type CarouselNavButtonProps = ComponentProps<"button"> & {
  direction?: "next" | "prev";
};

/**
 * Figma «زر-التالي-عرض» — 34×34 circle, ivory fill, soft border.
 * In RTL, "next" points toward inline-end visually via chevron-left (Figma SoT).
 */
export function CarouselNavButton({
  className,
  direction = "next",
  ...props
}: CarouselNavButtonProps) {
  return (
    <button
      type="button"
      aria-label={direction === "next" ? "التالي" : "السابق"}
      className={cn(
        "inline-flex size-[34px] shrink-0 items-center justify-center rounded-full border border-border-soft bg-bg-ivory text-text-primary outline-none transition-colors hover:bg-bg-muted focus-visible:ring-2 focus-visible:ring-brand-olive-soft/40 disabled:opacity-40",
        className
      )}
      {...props}
    >
      <Icon
        name={direction === "next" ? "chevron-left" : "chevron-right"}
        size={16}
      />
    </button>
  );
}
