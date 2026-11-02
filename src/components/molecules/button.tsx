"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Yallah Spa CTA button — Figma variants:
 * أساسي | ثانوي | شبح | نص
 */
const yallahButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-button transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-olive-soft/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "rounded-full bg-brand-olive px-[22px] py-3 text-text-inverse hover:bg-brand-olive-soft",
        secondary:
          "rounded-full border border-border-subtle bg-bg-muted px-[22px] py-3 text-brand-olive hover:bg-[#e8e2d4]",
        ghost:
          "rounded-full border-[1.5px] border-white bg-brand-olive px-[22px] py-3 text-text-inverse hover:bg-brand-olive-soft",
        text: "rounded-none bg-transparent px-0 py-0 text-brand-olive underline underline-offset-4 hover:text-brand-olive-soft",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      fullWidth: false,
    },
  }
);

type YallahButtonProps = ComponentProps<"button"> &
  VariantProps<typeof yallahButtonVariants> & {
    asChild?: boolean;
  };

export function YallahButton({
  className,
  variant,
  fullWidth,
  asChild = false,
  ...props
}: YallahButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="yallah-button"
      className={cn(yallahButtonVariants({ variant, fullWidth }), className)}
      {...props}
    />
  );
}

export { yallahButtonVariants };
