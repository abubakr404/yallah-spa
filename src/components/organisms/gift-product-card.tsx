"use client";

import Image from "next/image";
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

/** Figma «بطاقة-منتج-هدية» — 305×405, image 168. */
export function GiftProductCard({
  product,
  className,
  onGift,
}: GiftProductCardProps) {
  const branchLabel = `متوفرة في ${product.branchCount} فروع`;

  return (
    <article
      className={cn(
        "flex h-[405px] w-full max-w-[305px] flex-col overflow-hidden rounded-2xl border border-border-subtle bg-bg-surface text-start",
        className
      )}
    >
      <div className="relative h-[168px] w-full shrink-0">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover"
          sizes="305px"
        />
        {product.badge ? (
          <div className="absolute start-3 top-3">
            <Tag variant="package">{product.badge}</Tag>
          </div>
        ) : null}
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2.5 px-3.5 pb-3.5 pt-3">
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
            <Tag variant="center">في المركز</Tag>
          ) : null}
          {product.places.includes("home") ? (
            <Tag variant="home">زيارة منزلية</Tag>
          ) : null}
        </div>

        <Divider />

        <div className="flex items-center justify-between gap-2">
          <MetaRow icon="clock" label={`${product.durationMinutes} دقيقة`} />
          {product.serviceCount > 1 ? (
            <MetaRow
              icon="services"
              label={`${product.serviceCount} خدمات`}
              tone="strong"
            />
          ) : null}
        </div>

        <MetaRow icon="location" label={branchLabel} className="self-start" />

        <div className="mt-auto pt-1">
          <YallahButton
            fullWidth
            type="button"
            className="py-3"
            onClick={() => onGift?.(product.id)}
          >
            أهدِ هذه الباقة
          </YallahButton>
        </div>
      </div>
    </article>
  );
}
