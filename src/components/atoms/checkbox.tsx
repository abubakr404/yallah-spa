"use client";

import { cn } from "@/lib/utils";
import { Icon } from "./icon";

export type CheckboxState = "idle" | "checked" | "disabled";

type CheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  value?: string;
  onCheckedChange?: (checked: boolean) => void;
  "aria-label"?: string;
};

/**
 * Figma «صندوق-اختيار» — 20×20, radius 4.
 * idle: white + 1.5 border · checked: olive + white check · disabled: muted + faded
 */
export function Checkbox({
  checked = false,
  disabled = false,
  className,
  id,
  name,
  value,
  onCheckedChange,
  ...aria
}: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      id={id}
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      data-state={disabled ? "disabled" : checked ? "checked" : "idle"}
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center rounded-[4px] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-olive-soft/40",
        disabled &&
          "cursor-not-allowed border-[1.5px] border-border-subtle bg-bg-muted opacity-50",
        !disabled &&
          checked &&
          "border-0 bg-brand-olive text-text-inverse",
        !disabled &&
          !checked &&
          "border-[1.5px] border-border-subtle bg-bg-surface",
        className
      )}
      onClick={() => {
        if (!disabled) onCheckedChange?.(!checked);
      }}
      {...aria}
    >
      {checked && !disabled ? (
        <Icon name="check" size={14} className="text-white" strokeWidth={2.25} />
      ) : null}
      {/* Keep name/value for forms via hidden input when needed */}
      {name ? (
        <input
          type="hidden"
          name={name}
          value={checked ? (value ?? "on") : ""}
          disabled={disabled}
        />
      ) : null}
    </button>
  );
}
