"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/atoms/icon";
import { Tag } from "@/components/atoms/tag";
import { CheckboxRow } from "@/components/molecules/checkbox-row";
import { OrderSummaryCard } from "@/components/organisms/order-summary-card";
import { SiteHeader } from "@/components/organisms/site-header";
import { Stepper } from "@/components/organisms/stepper";
import { useLocalizedProducts } from "@/hooks/use-localized-products";
import { Link, useRouter } from "@/i18n/navigation";
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
  const t = useTranslations("Review");
  const tPlaces = useTranslations("Places");
  const tBadges = useTranslations("Badges");
  const tCommon = useTranslations("Common");

  const localizedProducts = useLocalizedProducts(products);

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

  const product = useMemo(
    () => localizedProducts.find((p) => p.id === draft?.giftId),
    [localizedProducts, draft?.giftId]
  );

  if (!draft || !product) {
    return (
      <div className="min-h-full bg-bg-page">
        <SiteHeader variant="journey" />
        <p className="p-8 text-center text-body text-text-secondary">{t("loading")}</p>
      </div>
    );
  }

  const pricing = splitInclusiveTax(product.priceSar);
  const placeLabel =
    draft.visit?.place === "home" ? tPlaces("home") : tPlaces("center");

  const confirm = async () => {
    if (!accepted) {
      setError(t("errorTerms"));
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
      setError(message || t("errorGeneric"));
      setConfirming(false);
    }
  };

  return (
    <div className="min-h-full bg-bg-page">
      <SiteHeader variant="journey" />
      <div className="bg-bg-surface py-3">
        <Stepper step={3} />
      </div>

      <main className="mx-auto grid max-w-[1440px] gap-8 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-8 lg:px-12 lg:py-8">
        <section className="space-y-5 text-start">
          <div>
            <h1 className="text-[28px] font-bold text-text-primary">{t("title")}</h1>
            <p className="mt-1 text-body text-text-secondary">{t("subtitle")}</p>
          </div>

          <article className="relative flex gap-4 rounded-xl border border-border-subtle bg-bg-surface p-[19px]">
            <div className="relative size-[112px] shrink-0">
              <div className="relative size-full overflow-hidden rounded-lg">
                <Image
                  src={product.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <button
                type="button"
                aria-label={t("removeAria")}
                className="absolute -top-1.5 right-[-6px] z-10 inline-flex size-5 cursor-pointer items-center justify-center rounded-full border border-white bg-[#8c4038] text-white outline-none hover:bg-[#7a3831]"
                onClick={() => {
                  clearGiftDraft();
                  router.push("/gifts");
                }}
              >
                <Icon name="close" size={12} className="text-white" />
              </button>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-card-title text-text-primary">{product.title}</h2>
                <Tag variant="package">{tBadges("gift")}</Tag>
              </div>
              <p className="mt-2 text-body-sm text-text-secondary">
                {tCommon("minutes", { count: product.durationMinutes })} · {placeLabel}
                {draft.visit
                  ? ` · ${tCommon("branchNamed", { name: draft.visit.branchName })}`
                  : ""}
              </p>
              {draft.visit ? (
                <p className="mt-1 text-caption text-text-secondary">
                  {t("appointment", { slot: draft.visit.slotLabel })}
                </p>
              ) : null}
              <p className="mt-1 text-caption text-text-secondary">
                {t("toFrom", {
                  recipient: draft.recipientName,
                  sender: draft.senderName,
                })}
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
                {t("editPersonalize")}
              </Link>
            </div>
          </article>

          <CheckboxRow
            id="accept-terms"
            checked={accepted}
            onCheckedChange={setAccepted}
            label={t("terms")}
            className="text-body-sm text-text-secondary"
          />

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
