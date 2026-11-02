"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/atoms/icon";
import { YallahButton } from "@/components/molecules/button";
import { GiftVoucherPreview } from "@/components/organisms/gift-voucher-preview";
import { SiteHeader } from "@/components/organisms/site-header";
import { loadLastOrder } from "@/lib/gift-journey/storage";
import type { GiftOrderSummary } from "@/types/gift-journey";

export function GiftSuccess() {
  const router = useRouter();
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
        <p className="p-8 text-center text-body text-text-secondary">
          جارٍ تحميل تأكيد الطلب…
        </p>
      </div>
    );
  }

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
          title: "هدية يلا سبا",
          text: `هدية خاصة إلى ${order.draft.recipientName}`,
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
          تم إتمام الطلب · {order.orderId}
        </span>
        <h1 className="text-[26px] font-bold leading-9 text-brand-olive">
          هديتك جاهزة للمشاركة
        </h1>
        <p className="text-[14px] leading-5 text-[#615c52]">
          حمّل البطاقة أو انسخ رابط الهدية لمشاركتها مع المستفيد.
        </p>

        <div className="mt-1 w-full max-w-[500px] text-start">
          <GiftVoucherPreview
            theme={order.draft.theme}
            recipientName={order.draft.recipientName}
            senderName={order.draft.senderName}
            message={order.draft.message}
            serviceTitle={order.product.title}
            durationMinutes={order.product.durationMinutes}
            visit={order.draft.visit}
          />
        </div>

        <div className="mt-1 w-full max-w-[500px] rounded-xl bg-bg-muted px-4 py-3 text-start">
          <p className="text-[13px] font-bold leading-[18px] text-text-primary">
            تعليمات للمستفيد
          </p>
          <ol className="mt-[5px] space-y-[5px] text-[12px] leading-[17px] text-[#615c52]">
            <li>1) افتح رابط الهدية أو امسح رمز QR</li>
            <li>2) راجع الفرع والموعد المحددين مسبقًا</li>
            <li>3) أظهر البطاقة في الفرع في الموعد المحدد</li>
          </ol>
        </div>

        <div className="mt-2 flex items-start justify-center gap-7">
          <IconAction
            icon="download"
            label="تحميل البطاقة"
            onClick={downloadCard}
          />
          <IconAction
            icon="copy"
            label={copied ? "تم النسخ" : "نسخ الرابط"}
            onClick={copyLink}
          />
          <IconAction
            icon="share"
            label="مشاركة الرابط"
            onClick={shareLink}
          />
        </div>

        <YallahButton variant="secondary" asChild className="mt-2 min-w-[200px]">
          <Link href="/gifts">أهدِ هدية أخرى</Link>
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
      className="flex flex-col items-center gap-2 text-brand-olive outline-none"
    >
      <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-border-subtle bg-bg-muted">
        <Icon name={icon} size={22} />
      </span>
      <span className="text-[12px] font-medium">{label}</span>
    </button>
  );
}
