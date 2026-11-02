import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type DsSectionProps = {
  id?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function DsSection({
  id,
  title,
  description,
  children,
  className,
}: DsSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "overflow-hidden rounded-2xl border border-border-subtle bg-bg-surface p-5 text-start sm:p-7",
        className
      )}
    >
      <header className="mb-5 sm:mb-7">
        <h2 className="text-display text-[28px] sm:text-[32px]">{title}</h2>
        {description ? (
          <p className="mt-1.5 text-caption text-text-secondary sm:text-body">
            {description}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  );
}

type DsBlockProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function DsBlock({ label, children, className }: DsBlockProps) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <p className="text-start text-caption font-medium text-text-secondary">
        {label}
      </p>
      <div className="flex flex-wrap items-start justify-start gap-3 sm:gap-4">
        {children}
      </div>
    </div>
  );
}
