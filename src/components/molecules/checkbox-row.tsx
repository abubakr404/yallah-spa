"use client";

import { Checkbox } from "@/components/atoms/checkbox";
import { cn } from "@/lib/utils";

type CheckboxRowProps = {
  id: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
};

/** Figma «صف-اختيار» — control at inline-start + label */
export function CheckboxRow({
  id,
  label,
  checked,
  disabled,
  onCheckedChange,
  className,
}: CheckboxRowProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2.5 text-start text-body text-text-primary",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <Checkbox
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        aria-label={label}
      />
      <span>{label}</span>
    </label>
  );
}
