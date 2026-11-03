"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Icon } from "@/components/atoms/icon";
import { YallahButton } from "@/components/molecules/button";
import { AssistantSheet } from "@/components/organisms/assistant-sheet";
import { GiftHero } from "@/components/organisms/gift-hero";
import { GiftProductCard } from "@/components/organisms/gift-product-card";
import { ProductCarousel } from "@/components/organisms/product-carousel";
import { SiteHeader } from "@/components/organisms/site-header";
import { useLocalizedProducts } from "@/hooks/use-localized-products";
import { Link, useRouter } from "@/i18n/navigation";
import { createEmptyDraft, saveGiftDraft } from "@/lib/gift-journey/storage";
import type { GiftProduct } from "@/types/gift";

type GiftsBrowseProps = {
  products: GiftProduct[];
};

export function GiftsBrowse({ products }: GiftsBrowseProps) {
  const router = useRouter();
  const t = useTranslations("GiftsBrowse");
  const tCommon = useTranslations("Common");
  const tFooter = useTranslations("GiftsFooter");
  const localized = useLocalizedProducts(products);
  const [assistOpen, setAssistOpen] = useState(false);

  const packages = useMemo(
    () => localized.filter((p) => p.badge === "package"),
    [localized]
  );
  const sessions = useMemo(
    () => localized.filter((p) => p.badge === "session"),
    [localized]
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
          title={t("packagesTitle")}
          subtitle={t("packagesSubtitle")}
          href="/gifts/search?type=package"
          viewAll={tCommon("viewAll")}
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
          title={t("sessionsTitle")}
          subtitle={t("sessionsSubtitle")}
          href="/gifts/search?type=session"
          viewAll={tCommon("viewAll")}
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
          <p className="text-text-primary">{tFooter("tagline")}</p>
          <p>{tFooter("legal")}</p>
        </div>
      </footer>

      <AssistantSheet
        open={assistOpen}
        onClose={() => setAssistOpen(false)}
        products={localized}
        onSelectGift={startGift}
      />
    </div>
  );
}

function CarouselSection({
  title,
  subtitle,
  href,
  viewAll,
  children,
}: {
  title: string;
  subtitle: string;
  href: string;
  viewAll: string;
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
          <Link href={href} aria-label={viewAll}>
            <span className="hidden text-[14px] font-medium sm:inline">
              {viewAll}
            </span>
            <Icon name="chevron-left" size={16} className="shrink-0" />
          </Link>
        </YallahButton>
      </div>
      {children}
    </section>
  );
}
