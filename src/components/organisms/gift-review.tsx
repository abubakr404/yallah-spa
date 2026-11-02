"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/atoms/icon";
import { Tag } from "@/components/atoms/tag";
import { CheckboxRow } from "@/components/molecules/checkbox-row";
import { OrderSummaryCard } from "@/components/organisms/order-summary-card";
import { SiteHeader } from "@/components/organisms/site-header";
import { Stepper } from "@/components/organisms/stepper";
import { createGiftOrder } from "@/lib/api";
import { splitInclusiveTax, formatSarExact } from "@/lib/gift-journey/pricing";
import {
  clearGiftDraft,
  loadGiftDraft,
  saveLastOrder,
} from "@/lib/gift-journey/storage";
import type { GiftProduct } from "@/types/gift";
import type { GiftDraft } from "@/types/gift-journey";

type GiftReviewProps = {
  products: GiftProduct[];
};

export function GiftReview({ products }: GiftReviewProps) {
  const router = useRouter();
  const [draft, setDraft] = useState<GiftDraft | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = loadGiftDraft();
    if (!stored?.giftId) {
      router.replace("/gifts");
      return;
    }
    setDraft(stored);
  }, [router]);

  const product = products.find((p) => p.id === draft?.giftId);

  if (!draft || !product) {
    return (
      <div className="min-h-full bg-bg-page">
        <SiteHeader variant="journey" />
        <p className="p-8 text-center text-body text-text-secondary">
          جارٍ تحميل سلة الهدايا…
        </p>
      </div>
    );
  }

  const pricing = splitInclusiveTax(product.priceSar);
  const placeLabel =
    draft.visit?.place === "home" ? "زيارة منزلية" : "في المركز";

  const confirm = async () => {
    if (!accepted) {
      setError("وافق على الشروط والأحكام لإتمام الطلب.");
      return;
    }
    setConfirming(true);
    setError(null);
    try {
      const { data } = await createGiftOrder({ draft, acceptTerms: true });
      saveLastOrder(data);
      clearGiftDraft();
      router.push("/gifts/success");
    } catch (err) {
      const message =
        err && typeof err === "object" && "body" in err
          ? String((err as { body?: { message?: string } }).body?.message ?? "")
          : err instanceof Error
            ? err.message
            : "";
      setError(message || "تعذّر إتمام الطلب.");
      setConfirming(false);
    }
  };

  return (
    <div className="min-h-full bg-bg-page">
      <SiteHeader variant="journey" />
      <div className="border-b border-border-subtle bg-bg-surface py-3">
        <Stepper step={3} />
      </div>

      <main className="mx-auto grid max-w-[1440px] gap-8 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-8 lg:px-12 lg:py-8">
        {/* RTL: cart on right (col1), invoice summary on left (col2) */}
        <section className="space-y-5 text-start">
          <div>
            <h1 className="text-[28px] font-bold text-text-primary">مراجعة الطلب</h1>
            <p className="mt-1 text-body text-text-secondary">
              خدمة هدية في سلتك — راجع التفاصيل ثم أتمّ الطلب.
            </p>
          </div>

          <article className="relative flex gap-4 rounded-xl border border-border-subtle bg-bg-surface p-4">
            <div className="relative size-[112px] shrink-0 overflow-hidden rounded-lg">
              <Image
                src={product.imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-card-title text-text-primary">{product.title}</h2>
                <Tag variant="package">هدية</Tag>
              </div>
              <p className="mt-2 text-body-sm text-text-secondary">
                {product.durationMinutes} دقيقة · {placeLabel}
                {draft.visit ? ` · فرع ${draft.visit.branchName}` : ""}
              </p>
              {draft.visit ? (
                <p className="mt-1 text-caption text-text-secondary">
                  الموعد: {draft.visit.slotLabel}
                </p>
              ) : null}
              <p className="mt-1 text-caption text-text-secondary">
                إلى {draft.recipientName} · من {draft.senderName}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end justify-between">
              <p className="text-body font-bold text-brand-olive">
                {formatSarExact(product.priceSar)}
              </p>
              <Link
                href={`/gifts/personalize?giftId=${encodeURIComponent(product.id)}`}
                className="text-caption font-medium text-brand-olive underline-offset-2 hover:underline"
              >
                تعديل التخصيص
              </Link>
            </div>
            <button
              type="button"
              aria-label="إزالة من السلة"
              className="absolute -start-2 -top-2 inline-flex size-5 items-center justify-center rounded-full bg-bg-surface text-text-secondary shadow ring-1 ring-border-subtle hover:text-danger"
              onClick={() => {
                clearGiftDraft();
                router.push("/gifts");
              }}
            >
              <Icon name="close" size={12} />
            </button>
          </article>

          <div className="rounded-xl border border-border-subtle bg-bg-page-soft/50 p-4">
            <CheckboxRow
              id="accept-terms"
              checked={accepted}
              onCheckedChange={setAccepted}
              label="باستمرارك بإتمام الطلب فأنت موافق على الشروط والأحكام"
            />
          </div>

          {error ? (
            <p className="text-body-sm text-danger" role="alert">
              {error}
            </p>
          ) : null}
        </section>

        <OrderSummaryCard
          className="lg:sticky lg:top-24"
          serviceCount={1}
          giftCount={1}
          directBookingCount={0}
          subtotalSar={pricing.subtotalSar}
          taxSar={pricing.taxSar}
          totalSar={pricing.totalSar}
          confirming={confirming}
          onConfirm={confirm}
        />
      </main>
    </div>
  );
}
