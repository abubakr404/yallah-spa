import { cn } from "@/lib/utils";

type IndicatorProps = {
  active?: boolean;
  className?: string;
  onClick?: () => void;
};

/** Figma «نقطة-نشطة / نقطة-خاملة» — active pill 16×7, idle dot 7×7 */
export function Indicator({ active = false, className, onClick }: IndicatorProps) {
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      data-slot="indicator"
      data-active={active || undefined}
      aria-current={active ? "true" : undefined}
      onClick={onClick}
      className={cn(
        "rounded-full transition-all",
        active ? "h-[7px] w-4 bg-brand-olive" : "size-[7px] bg-border-soft",
        onClick && "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-olive-soft/40",
        className
      )}
    />
  );
}

type IndicatorGroupProps = {
  count: number;
  activeIndex: number;
  className?: string;
  onSelect?: (index: number) => void;
};

export function IndicatorGroup({
  count,
  activeIndex,
  className,
  onSelect,
}: IndicatorGroupProps) {
  return (
    <div
      className={cn("flex h-10 items-center justify-center gap-2", className)}
      role="tablist"
      aria-label="ترقيم العرض"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Indicator
          key={i}
          active={i === activeIndex}
          onClick={onSelect ? () => onSelect(i) : undefined}
        />
      ))}
    </div>
  );
}
