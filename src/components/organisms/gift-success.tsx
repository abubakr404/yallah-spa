"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Icon } from "@/components/atoms/icon";
import { YallahButton } from "@/components/molecules/button";
import { GiftVoucherPreview } from "@/components/organisms/gift-voucher-preview";
import { SiteHeader } from "@/components/organisms/site-header";
import { Link, useRouter } from "@/i18n/navigation";
import { loadLastOrder } from "@/lib/gift-journey/storage";
import type { GiftOrderSummary } from "@/types/gift-journey";

export function GiftSuccess() {
  const router = useRouter();
  const t = useTranslations("Success");
  const tCatalog = useTranslations("Catalog");

  const [order, setOrder] = useState<GiftOrderSummary | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = loadLastOrder();
    if (!stored) {
      router.replace("/gifts");
      return;
    }
    setOrder(stored);
  }, [router]);

  if (!order) {
    return (
      <div className="min-h-full bg-bg-page">
        <SiteHeader variant="journey" />
        <p className="p-8 text-center text-body text-text-secondary">{t("loading")}</p>
      </div>
    );
  }

  const serviceTitle = tCatalog(`${order.product.id}.title`);

  const giftLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/gifts/success?order=${order.orderId}`
      : `https://yallah.spa/gifts/${order.orderId}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(giftLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t("shareTitle"),
          text: t("shareText", { name: order.draft.recipientName }),
          url: giftLink,
        });
        return;
      } catch {
        /* fall through */
      }
    }
    await copyLink();
  };

  const downloadCard = () => {
    window.print();
  };

  return (
    <div className="min-h-full bg-bg-page">
      <SiteHeader variant="journey" />
      <main className="mx-auto flex max-w-[600px] flex-col items-center gap-3.5 px-4 pb-10 pt-5 text-center sm:px-6">
        <span className="rounded-full bg-[rgba(64,115,82,0.12)] px-3 py-[7px] text-[12px] font-medium leading-[17px] text-success">
          {t("badge", { orderId: order.orderId })}
        </span>
        <h1 className="text-[26px] font-bold leading-9 text-brand-olive">{t("title")}</h1>
        <p className="text-[14px] leading-5 text-[#615c52]">{t("subtitle")}</p>

        <div className="mt-1 w-full max-w-[500px] text-start">
          <GiftVoucherPreview
            theme={order.draft.theme}
            recipientName={order.draft.recipientName}
            senderName={order.draft.senderName}
            message={order.draft.message}
            serviceTitle={serviceTitle}
            durationMinutes={order.product.durationMinutes}
            visit={order.draft.visit}
          />
        </div>

        <div className="mt-1 w-full max-w-[500px] rounded-xl bg-bg-muted px-4 py-3 text-start">
          <p className="text-[13px] font-bold leading-[18px] text-text-primary">
            {t("instructionsTitle")}
          </p>
          <ol className="mt-[5px] space-y-[5px] text-[12px] leading-[17px] text-[#615c52]">
            <li>{t("step1")}</li>
            <li>{t("step2")}</li>
            <li>{t("step3")}</li>
          </ol>
        </div>

        <div className="mt-2 flex items-start justify-center gap-7">
          <IconAction icon="download" label={t("download")} onClick={downloadCard} />
          <IconAction
            icon="copy"
            label={copied ? t("copied") : t("copy")}
            onClick={copyLink}
          />
          <IconAction icon="share" label={t("share")} onClick={shareLink} />
        </div>

        <YallahButton variant="secondary" asChild className="mt-2 min-w-[200px]">
          <Link href="/gifts">{t("another")}</Link>
        </YallahButton>
      </main>
    </div>
  );
}

function IconAction({
  icon,
  label,
  onClick,
}: {
  icon: "download" | "copy" | "share";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex cursor-pointer flex-col items-center gap-2 text-brand-olive outline-none"
    >
      <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-border-subtle bg-bg-muted">
        <Icon name={icon} size={22} />
      </span>
      <span className="text-[12px] font-medium">{label}</span>
    </button>
  );
}
