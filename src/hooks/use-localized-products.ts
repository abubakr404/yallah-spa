"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import type { GiftProduct } from "@/types/gift";

/** Overlay Catalog / Badges copy onto gift products for the active locale. */
export function useLocalizedProducts(products: GiftProduct[]): GiftProduct[] {
  const tCatalog = useTranslations("Catalog");
  const tBadges = useTranslations("Badges");

  return useMemo(
    () =>
      products.map((product) => ({
        ...product,
        title: tCatalog(`${product.id}.title`),
        description: tCatalog(`${product.id}.description`),
        badgeLabel: product.badge ? tBadges(product.badge) : undefined,
      })),
    [products, tCatalog, tBadges]
  );
}
