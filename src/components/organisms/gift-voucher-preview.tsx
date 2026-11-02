import Image from "next/image";
import { Icon } from "@/components/atoms/icon";
import { CARD_THEMES, type CardThemeId, type VisitDetails } from "@/types/gift-journey";
import { cn } from "@/lib/utils";

type GiftVoucherPreviewProps = {
  theme?: CardThemeId;
  recipientName?: string;
  senderName?: string;
  message?: string;
  serviceTitle?: string;
  durationMinutes?: number;
  visit?: VisitDetails | null;
  className?: string;
  compact?: boolean;
};

/** Live gift voucher — Figma Olive (dark) / Gold / Floral (light). */
export function GiftVoucherPreview({
  theme = "olive",
  recipientName = "",
  senderName = "",
  message = "",
  serviceTitle = "خدمة هدية",
  durationMinutes = 60,
  visit = null,
  className,
  compact = false,
}: GiftVoucherPreviewProps) {
  const palette = CARD_THEMES.find((t) => t.id === theme) ?? CARD_THEMES[0];
  const isDark = palette.mode === "dark";
  const toLabel = recipientName.trim() ? `إلى ${recipientName.trim()}` : "إلى …";
  const fromLabel = senderName.trim()
    ? `بكل حب، ${senderName.trim()}`
    : "بكل حب، …";
  const quote = message.trim()
    ? `«${message.trim()}»`
    : "«اكتب رسالتك هنا…»";

  return (
    <article
      className={cn(
        "overflow-hidden rounded-[18px] border-[2.5px] shadow-[0_8px_28px_rgba(41,41,36,0.12)]",
        className
      )}
      style={{
        backgroundColor: palette.surface,
        borderColor: palette.border,
      }}
    >
      <div
        className={cn(
          "flex flex-col items-center px-6 text-center",
          compact ? "gap-2 py-5" : "gap-2.5 pb-4 pt-5"
        )}
      >
        <div className="flex items-center gap-2.5">
          <Image
            src="/assets/icons/leaf-gold.svg"
            alt=""
            width={20}
            height={20}
            className={
              theme === "floral"
                ? "opacity-80 [filter:hue-rotate(-25deg)_saturate(1.2)]"
                : undefined
            }
          />
          <span
            className="text-[12px] font-medium"
            style={{ color: palette.brand }}
          >
            يلا سبا
          </span>
          <Image
            src="/assets/icons/leaf-gold.svg"
            alt=""
            width={20}
            height={20}
            className={
              theme === "floral"
                ? "opacity-80 [filter:hue-rotate(-25deg)_saturate(1.2)]"
                : undefined
            }
          />
        </div>
        <span
          className="h-px w-16"
          style={{ backgroundColor: `${palette.accent}B3` }}
          aria-hidden
        />
        <p
          className="text-[13px] font-medium"
          style={{ color: isDark ? palette.brand : palette.heading }}
        >
          هدية خاصة لك
        </p>
        <p
          className={cn(
            "font-bold leading-tight",
            compact ? "text-xl" : "text-[28px] leading-[39px]"
          )}
          style={{ color: palette.heading }}
        >
          {toLabel}
        </p>
        <p className="text-[14px] font-medium" style={{ color: palette.muted }}>
          لحظات من الراحة تستحقينها
        </p>
        {isDark ? (
          <p
            className={cn(
              "max-w-[436px] text-[13px] leading-[18px]",
              compact && "line-clamp-3"
            )}
            style={{ color: palette.quote }}
          >
            {quote}
          </p>
        ) : (
          <div
            className={cn("rounded-[10px] border px-3.5 py-2.5", compact && "max-w-full")}
            style={{
              backgroundColor: "rgba(255,255,255,0.7)",
              borderColor: `${palette.accent}59`,
            }}
          >
            <p
              className={cn("text-[13px] leading-[18px]", compact && "line-clamp-3")}
              style={{ color: palette.quote }}
            >
              {quote}
            </p>
          </div>
        )}
        <p className="text-[13px] font-bold" style={{ color: palette.brand }}>
          {fromLabel}
        </p>
      </div>

      <div
        className="flex items-center justify-between gap-3 px-[18px] py-4 text-text-primary"
        style={{ backgroundColor: palette.footer }}
      >
        {/* Figma: details at start (right), QR at end (left) */}
        <div className="min-w-0 flex-1 space-y-1.5 text-start">
          <p className="text-[13px] font-bold leading-[19px]">{serviceTitle}</p>
          <Detail icon="clock" label={`المدة: ${durationMinutes} دقيقة`} />
          <Detail
            icon="location"
            label={
              visit ? `الفرع المختار: ${visit.branchName}` : "الفرع المختار: —"
            }
          />
          <Detail
            icon="calendar"
            label={visit ? `الموعد: ${visit.slotLabel}` : "الموعد: —"}
            accent
            accentColor={palette.accent}
          />
        </div>
        <div className="flex shrink-0 flex-col items-center gap-1.5">
          <div
            className="grid size-[78px] place-items-center rounded-md bg-white"
            aria-hidden
          >
            <Image
              src="/assets/icons/qr-viewfinder.svg"
              alt=""
              width={68}
              height={68}
              className="size-[68px]"
            />
          </div>
          <p className="max-w-[125px] text-center text-[10px] font-medium leading-[14px] text-brand-olive">
            امسح الرمز لعرض تفاصيل الزيارة
          </p>
        </div>
      </div>
    </article>
  );
}

function Detail({
  icon,
  label,
  accent = false,
  accentColor,
}: {
  icon: "clock" | "location" | "calendar";
  label: string;
  accent?: boolean;
  accentColor?: string;
}) {
  // Figma «صف-أيقونة-وسم»: icon at inline-start (right in RTL)
  return (
    <div className="flex items-center gap-2">
      <Icon name={icon} size={14} className="shrink-0" />
      <span
        className={cn(
          "min-w-0 flex-1 truncate text-[12px] font-medium leading-[17px]",
          !accent && "text-text-primary"
        )}
        style={accent ? { color: accentColor ?? "#4b4d3a" } : undefined}
      >
        {label}
      </span>
    </div>
  );
}
