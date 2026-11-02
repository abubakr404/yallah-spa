"use client";

import Image from "next/image";
import { YallahButton } from "@/components/molecules/button";
import { formatSar, cn } from "@/lib/utils";
import type { GiftProduct } from "@/types/gift";

type SuggestionCardProps = {
  product: GiftProduct;
  className?: string;
  onSelect?: (id: string) => void;
};

/** Compact horizontal card — image at start, CTA at end. */
export function SuggestionCard({
  product,
  className,
  onSelect,
}: SuggestionCardProps) {
  return (
    <article
      className={cn(
        "flex w-full max-w-md items-center gap-3 rounded-lg border border-border-subtle bg-bg-surface p-3 text-start",
        className
      )}
    >
      <div className="relative size-[72px] shrink-0 overflow-hidden rounded-xl">
        <Image
          src={product.imageUrl}
          alt=""
          fill
          className="object-cover"
          sizes="72px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-card-title">{product.title}</h3>
        <p className="text-body-sm font-bold text-brand-olive">
          {formatSar(product.priceSar)}
        </p>
      </div>
      <YallahButton
        variant="secondary"
        className="shrink-0 px-4 py-2"
        type="button"
        onClick={() => onSelect?.(product.id)}
      >
        اختيار
      </YallahButton>
    </article>
  );
}
