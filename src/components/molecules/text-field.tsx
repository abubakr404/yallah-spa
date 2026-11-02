import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type TextFieldProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

export function TextField({
  className,
  label,
  id,
  error,
  ...props
}: TextFieldProps) {
  const inputId = id ?? props.name;
  return (
    <label className="flex w-full flex-col gap-1.5 text-start">
      {label ? (
        <span className="text-caption text-text-secondary">{label}</span>
      ) : null}
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        className={cn(
          "h-12 w-full rounded-md border bg-bg-surface px-3.5 py-3 text-start text-body text-text-primary outline-none transition-colors placeholder:text-text-secondary focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-danger focus-visible:border-danger focus-visible:ring-danger/20"
            : "border-border-subtle focus-visible:border-brand-olive-soft focus-visible:ring-brand-olive-soft/25",
          className
        )}
        {...props}
      />
      {error ? (
        <span className="text-[12px] font-medium text-danger" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
