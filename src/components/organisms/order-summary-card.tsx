"use client";

import Link from "next/link";
import { YallahButton } from "@/components/molecules/button";
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
  return (
    <aside
      className={cn(
        "overflow-hidden rounded-xl border border-border-subtle bg-bg-surface",
        className
      )}
    >
      <div className="border-b border-border-subtle px-5 py-5 text-start">
        <h2 className="text-card-title text-text-primary">ملخص الحجز</h2>
        <p className="mt-1 text-caption text-text-secondary">
          ملخص سلة الخدمات قبل الإتمام
        </p>
      </div>

      <div className="space-y-3.5 px-5 py-4 text-body-sm">
        <Row label="عدد الخدمات" value={String(serviceCount)} />
        <Row label="منها هدايا" value={String(giftCount)} />
        <Row label="حجوزات مباشرة" value={String(directBookingCount)} />
        <Row label="المجموع الفرعي" value={formatSarExact(subtotalSar)} />
        <Row label="الضريبة" value={formatSarExact(taxSar)} />
      </div>

      <div className="border-t border-border-subtle px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-body-sm font-medium text-text-primary">الإجمالي</span>
          <span className="text-xl font-bold text-brand-olive">
            {formatSarExact(totalSar)}
          </span>
        </div>
        <p className="mt-1 text-caption text-text-secondary">
          بدون رسوم إضافية على السلة
        </p>
      </div>

      <div className="flex flex-col gap-2.5 px-5 pb-5">
        <YallahButton
          fullWidth
          type="button"
          disabled={confirming}
          onClick={onConfirm}
        >
          {confirming ? "جارٍ إتمام الطلب…" : "إتمام الطلب"}
        </YallahButton>
        <YallahButton variant="secondary" fullWidth asChild>
          <Link href="/gifts">أضف المزيد</Link>
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
