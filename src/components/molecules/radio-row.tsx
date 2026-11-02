"use client";

import { Radio } from "@/components/atoms/radio";
import { cn } from "@/lib/utils";

type RadioRowProps = {
  id: string;
  value: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  onSelect?: (value: string) => void;
  className?: string;
};

/** Figma «صف-راديو / خيار-راديو» */
export function RadioRow({
  id,
  value,
  label,
  checked,
  disabled,
  name,
  onSelect,
  className,
}: RadioRowProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2.5 text-start text-body text-text-primary",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <Radio
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onSelect={() => onSelect?.(value)}
        aria-label={label}
      />
      <span>{label}</span>
    </label>
  );
}
