"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Divider } from "@/components/atoms/divider";
import { Tag } from "@/components/atoms/tag";
import { YallahButton } from "@/components/molecules/button";
import { MetaRow } from "@/components/molecules/meta-row";
import { formatSar, cn } from "@/lib/utils";
import type { GiftProduct } from "@/types/gift";

type GiftProductCardProps = {
  product: GiftProduct;
  className?: string;
  onGift?: (id: string) => void;
};

/** Figma «بطاقة-منتج-هدية» — image 168, body hugs content (no empty footer gap). */
export function GiftProductCard({
  product,
  className,
  onGift,
}: GiftProductCardProps) {
  const t = useTranslations("GiftCard");
  const tCommon = useTranslations("Common");
  const tPlaces = useTranslations("Places");
  const tBadges = useTranslations("Badges");

  const badgeText =
    product.badgeLabel ??
    (product.badge ? tBadges(product.badge) : undefined);
  const branchLabel = tCommon("branchesAvailable", {
    count: product.branchCount,
  });
  const showServices = product.serviceCount >= 2;

  return (
    <article
      className={cn(
        "flex w-full max-w-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-bg-surface text-start sm:max-w-[305px]",
        className
      )}
    >
      <div className="group relative h-[168px] w-full shrink-0 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          draggable={false}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 [-webkit-user-drag:none]"
          sizes="305px"
        />
        {badgeText ? (
          <div className="absolute start-3 top-3">
            <Tag variant="package">{badgeText}</Tag>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-2.5 px-3.5 pb-3.5 pt-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-bold leading-[23px] text-text-primary">
              {product.title}
            </h3>
            <p className="truncate text-[13px] leading-[14px] text-[#615c52]">
              {product.description}
            </p>
          </div>
          <p className="shrink-0 text-lg font-bold leading-[26px] text-brand-olive">
            {formatSar(product.priceSar)}
          </p>
        </div>

        <div className="flex flex-wrap justify-start gap-2">
          {product.places.includes("center") ? (
            <Tag variant="center">{tPlaces("center")}</Tag>
          ) : null}
          {product.places.includes("home") ? (
            <Tag variant="home">{tPlaces("home")}</Tag>
          ) : null}
        </div>

        <Divider />

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <MetaRow
              icon="clock"
              label={tCommon("minutes", { count: product.durationMinutes })}
            />
            {showServices ? (
              <MetaRow
                icon="services"
                label={tCommon("services", { count: product.serviceCount })}
                tone="strong"
              />
            ) : null}
          </div>
          <MetaRow icon="location" label={branchLabel} className="self-start" />
        </div>

        <YallahButton
          fullWidth
          type="button"
          className="py-3"
          onClick={() => onGift?.(product.id)}
        >
          {t("giftCta")}
        </YallahButton>
      </div>
    </article>
  );
}
