"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-full px-3.5 py-2 text-badge transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-olive-soft/40",
  {
    variants: {
      selected: {
        true: "border border-transparent bg-brand-olive text-text-inverse",
        false:
          "border border-border-subtle bg-bg-muted text-text-primary hover:bg-[#e8e2d4]",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

type ChipProps = ComponentProps<"button"> & VariantProps<typeof chipVariants>;

/** Figma «رقاقة» — selected olive / idle muted+border */
export function Chip({ className, selected, ...props }: ChipProps) {
  return (
    <button
      type="button"
      data-slot="chip"
      aria-pressed={!!selected}
      className={cn(chipVariants({ selected }), className)}
      {...props}
    />
  );
}

export { chipVariants };
