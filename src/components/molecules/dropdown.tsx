"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/atoms/icon";
import { cn } from "@/lib/utils";

export type DropdownOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  menuClassName?: string;
  onValueChange?: (value: string) => void;
  "aria-label"?: string;
};

/**
 * Figma «حقل-قائمة» + «خيار-قائمة»
 * Trigger: h-48, radius-lg 16, border-subtle
 * Menu: radius-md 12, shadow, selected row = muted + check at end
 */
export function Dropdown({
  options,
  value: controlled,
  defaultValue,
  placeholder = "اختر",
  disabled,
  className,
  menuClassName,
  onValueChange,
  ...aria
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? "");
  const value = controlled ?? uncontrolled;
  const selected = options.find((o) => o.value === value);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative w-full max-w-[280px]", className)}>
      <button
        type="button"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        className={cn(
          "flex h-12 w-full items-center justify-between gap-2 rounded-lg border border-border-subtle bg-bg-surface px-3.5 text-start text-body-sm font-medium text-text-primary outline-none transition-colors focus-visible:border-brand-olive-soft focus-visible:ring-2 focus-visible:ring-brand-olive-soft/25 disabled:cursor-not-allowed disabled:opacity-50",
          open && "border-brand-olive-soft"
        )}
        onClick={() => setOpen((v) => !v)}
        {...aria}
      >
        <span className={cn("min-w-0 flex-1 truncate", !selected && "text-text-secondary")}>
          {selected?.label ?? placeholder}
        </span>
        <Icon
          name="chevron-down"
          className={cn(
            "shrink-0 text-text-secondary transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          className={cn(
            "absolute inset-x-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-md border border-border-subtle bg-bg-surface py-1.5 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.12)]",
            menuClassName
          )}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li key={opt.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={cn(
                    "flex h-[42px] w-full items-center justify-between gap-2 px-3.5 text-start text-body-sm transition-colors",
                    isSelected
                      ? "bg-bg-muted font-medium text-brand-olive"
                      : "bg-bg-surface font-normal text-text-primary hover:bg-bg-muted/70"
                  )}
                  onClick={() => {
                    if (controlled === undefined) setUncontrolled(opt.value);
                    onValueChange?.(opt.value);
                    setOpen(false);
                  }}
                >
                  <span className="min-w-0 flex-1 truncate">{opt.label}</span>
                  <span className="inline-flex size-3.5 shrink-0 items-center justify-center">
                    {isSelected ? (
                      <Icon name="check" size={14} className="text-brand-olive" />
                    ) : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
