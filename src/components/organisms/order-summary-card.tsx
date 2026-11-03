"use client";

import { useTranslations } from "next-intl";
import { YallahButton } from "@/components/molecules/button";
import { Link } from "@/i18n/navigation";
import { formatSarExact } from "@/lib/gift-journey/pricing";
import { cn } from "@/lib/utils";

type OrderSummaryCardProps = {
  serviceCount: number;
  giftCount: number;
  directBookingCount: number;
  subtotalSar: number;
  taxSar: number;
  totalSar: number;
  onConfirm?: () => void;
  confirming?: boolean;
  className?: string;
};

/** Figma «Invoice / Summary» — sticky review sidebar. */
export function OrderSummaryCard({
  serviceCount,
  giftCount,
  directBookingCount,
  subtotalSar,
  taxSar,
  totalSar,
  onConfirm,
  confirming = false,
  className,
}: OrderSummaryCardProps) {
  const t = useTranslations("OrderSummary");

  return (
    <aside
      className={cn(
        "overflow-hidden rounded-xl border border-border-subtle bg-bg-surface",
        className
      )}
    >
      <div className="border-b border-border-subtle bg-bg-muted px-5 pb-4 pt-5 text-start">
        <h2 className="text-base font-bold text-brand-olive">{t("title")}</h2>
        <p className="mt-1 text-[12px] leading-normal text-[#615c52]">
          {t("subtitle")}
        </p>
      </div>

      <div className="space-y-3.5 px-5 py-4 text-body-sm">
        <Row label={t("serviceCount")} value={String(serviceCount)} />
        <Row label={t("giftCount")} value={String(giftCount)} />
        <Row label={t("directBookings")} value={String(directBookingCount)} />
        <Row label={t("subtotal")} value={formatSarExact(subtotalSar)} />
        <Row label={t("tax")} value={formatSarExact(taxSar)} />
      </div>

      <div className="border-t border-border-subtle px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-body-sm font-medium text-text-primary">
            {t("total")}
          </span>
          <span className="text-xl font-bold text-brand-olive">
            {formatSarExact(totalSar)}
          </span>
        </div>
        <p className="mt-1 text-caption text-text-secondary">{t("noFees")}</p>
      </div>

      <div className="flex flex-col gap-2.5 px-5 pb-5">
        <YallahButton
          fullWidth
          type="button"
          disabled={confirming}
          onClick={onConfirm}
        >
          {confirming ? t("confirming") : t("confirm")}
        </YallahButton>
        <YallahButton variant="secondary" fullWidth asChild>
          <Link href="/gifts">{t("addMore")}</Link>
        </YallahButton>
      </div>
    </aside>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-text-secondary">{label}</span>
      <span className="font-medium text-text-primary">{value}</span>
    </div>
  );
}
