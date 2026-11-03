"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/atoms/icon";
import { YallahButton } from "@/components/molecules/button";
import { AssistantSheet } from "@/components/organisms/assistant-sheet";
import { GiftHero } from "@/components/organisms/gift-hero";
import { GiftProductCard } from "@/components/organisms/gift-product-card";
import { ProductCarousel } from "@/components/organisms/product-carousel";
import { SiteHeader } from "@/components/organisms/site-header";
import { createEmptyDraft, saveGiftDraft } from "@/lib/gift-journey/storage";
import type { GiftProduct } from "@/types/gift";

type GiftsBrowseProps = {
  products: GiftProduct[];
};

export function GiftsBrowse({ products }: GiftsBrowseProps) {
  const router = useRouter();
  const [assistOpen, setAssistOpen] = useState(false);

  const packages = useMemo(
    () => products.filter((p) => p.badge === "باقة"),
    [products]
  );
  const sessions = useMemo(
    () => products.filter((p) => p.badge === "جلسة"),
    [products]
  );

  const startGift = (id: string) => {
    saveGiftDraft(createEmptyDraft(id));
    router.push(`/gifts/personalize?giftId=${encodeURIComponent(id)}`);
  };

  return (
    <div className="min-h-full bg-bg-page">
      <SiteHeader />
      <GiftHero onAssist={() => setAssistOpen(true)} />

      <main className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 py-7 sm:px-6 lg:px-12">
        <CarouselSection
          title="باقات جاهزة للإهداء"
          subtitle="تجارب كاملة يمكن إهداؤها مباشرة"
          href="/gifts/search?type=باقة"
        >
          <ProductCarousel>
            {packages.map((product) => (
              <GiftProductCard
                key={product.id}
                product={product}
                onGift={startGift}
              />
            ))}
          </ProductCarousel>
        </CarouselSection>

        <CarouselSection
          title="جلسات مقترحة للإهداء"
          subtitle="جلسات مفردة مناسبة كهدية سريعة"
          href="/gifts/search?type=جلسة"
        >
          <ProductCarousel>
            {sessions.map((product) => (
              <GiftProductCard
                key={product.id}
                product={product}
                onGift={startGift}
              />
            ))}
          </ProductCarousel>
        </CarouselSection>
      </main>

      <footer className="border-t border-border-subtle bg-bg-page px-4 py-4 sm:px-6 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2 text-caption">
          <p className="text-text-primary">يلا سبا — أهدِ الاسترخاء لمن تحب</p>
          <p>سياسة الخصوصية · الشروط</p>
        </div>
      </footer>

      <AssistantSheet
        open={assistOpen}
        onClose={() => setAssistOpen(false)}
        products={products}
        onSelectGift={startGift}
      />
    </div>
  );
}

function CarouselSection({
  title,
  subtitle,
  href,
  children,
}: {
  title: string;
  subtitle: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <section className="text-start">
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold leading-[29px] text-text-primary">
            {title}
          </h2>
          <p className="text-[13px] leading-[19px] text-[#615c52]">{subtitle}</p>
        </div>
        <YallahButton variant="text" asChild className="gap-1">
          <Link href={href} aria-label="عرض الكل">
            <span className="hidden text-[14px] font-medium sm:inline">
              عرض الكل
            </span>
            <Icon name="chevron-left" size={16} className="shrink-0" />
          </Link>
        </YallahButton>
      </div>
      {children}
    </section>
  );
}
