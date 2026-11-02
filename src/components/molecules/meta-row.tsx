import { Icon, type IconName } from "@/components/atoms/icon";
import { cn } from "@/lib/utils";

type MetaRowProps = {
  icon: Extract<IconName, "clock" | "location" | "calendar" | "services">;
  label: string;
  className?: string;
  tone?: "muted" | "strong";
};

/**
 * Figma «صف-أيقونة-وسم» — in RTL, icon at inline-start (right), then label.
 * Uses Figma outline SVGs via Icon atom.
 */
export function MetaRow({
  icon,
  label,
  className,
  tone = "muted",
}: MetaRowProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5",
        tone === "muted"
          ? "text-[12px] font-normal text-[#6b6659]"
          : "text-[13px] font-medium text-text-primary",
        className
      )}
    >
      <Icon name={icon} size={16} className="shrink-0" />
      <span>{label}</span>
    </div>
  );
}
