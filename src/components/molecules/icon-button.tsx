"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { Icon, type IconName } from "@/components/atoms/icon";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center text-text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-olive-soft/40 disabled:opacity-50",
  {
    variants: {
      variant: {
        close: "size-9 rounded-full bg-bg-muted hover:bg-[#e8e2d4]",
        remove: "size-7 rounded-full bg-bg-surface hover:bg-bg-muted",
        surface:
          "size-14 rounded-lg border border-border-soft bg-bg-ivory hover:bg-bg-muted",
      },
    },
    defaultVariants: {
      variant: "close",
    },
  }
);

type IconButtonProps = ComponentProps<"button"> &
  VariantProps<typeof iconButtonVariants> & {
    icon?: IconName;
    label: string;
  };

export function IconButton({
  className,
  variant,
  icon = "close",
  label,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(iconButtonVariants({ variant }), className)}
      {...props}
    >
      <Icon name={icon} size={variant === "remove" ? 14 : 16} />
    </button>
  );
}

export { iconButtonVariants };
