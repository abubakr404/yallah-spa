"use client";

import { cn } from "@/lib/utils";

type RadioProps = {
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  value?: string;
  name?: string;
  onSelect?: () => void;
  "aria-label"?: string;
};

/**
 * Figma «راديو» — 20×20.
 * idle: surface + 1.5 border · checked: olive border + olive dot · disabled: muted fill
 */
export function Radio({
  checked = false,
  disabled = false,
  className,
  id,
  value,
  name,
  onSelect,
  ...aria
}: RadioProps) {
  return (
    <button
      type="button"
      role="radio"
      id={id}
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      data-state={disabled ? "disabled" : checked ? "checked" : "idle"}
      value={value}
      className={cn(
        "relative inline-flex size-5 shrink-0 items-center justify-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-olive-soft/40",
        disabled && "cursor-not-allowed border-0 bg-bg-muted opacity-50",
        !disabled &&
          checked &&
          "border-[1.5px] border-brand-olive bg-bg-surface",
        !disabled &&
          !checked &&
          "border-[1.5px] border-border-subtle bg-bg-surface",
        className
      )}
      onClick={() => {
        if (!disabled) onSelect?.();
      }}
      {...aria}
    >
      {checked && !disabled ? (
        <span className="size-2.5 rounded-full bg-brand-olive" aria-hidden />
      ) : null}
      {name ? (
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          readOnly
          className="sr-only"
          tabIndex={-1}
        />
      ) : null}
    </button>
  );
}
