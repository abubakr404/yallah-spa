"use client";

import type { ComponentProps } from "react";
import { Icon, type IconName } from "@/components/atoms/icon";
import { cn } from "@/lib/utils";

type ActionTileProps = ComponentProps<"button"> & {
  icon: IconName;
  label: string;
};

export function ActionTile({
  className,
  icon,
  label,
  ...props
}: ActionTileProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex cursor-pointer flex-col items-center gap-2 text-badge text-brand-olive outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-brand-olive-soft/40",
        className
      )}
      {...props}
    >
      <span className="flex size-14 items-center justify-center overflow-hidden rounded-lg border border-border-soft bg-bg-ivory">
        <Icon name={icon} />
      </span>
      <span>{label}</span>
    </button>
  );
}
