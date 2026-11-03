import type { GiftProduct, GiftBadge } from "@/types/gift";

/** Resolve catalog copy from next-intl `Catalog` / `Badges` namespaces. */
export function catalogTitle(
  t: (key: string) => string,
  productId: string
): string {
  return t(`${productId}.title`);
}

export function catalogDescription(
  t: (key: string) => string,
  productId: string
): string {
  return t(`${productId}.description`);
}

export function badgeLabel(
  t: (key: GiftBadge) => string,
  badge: GiftBadge | undefined
): string {
  return badge ? t(badge) : "";
}

export function withLocalizedCopy(
  product: GiftProduct,
  title: string,
  description: string,
  badgeText: string
): GiftProduct {
  return {
    ...product,
    title,
    description,
    badgeLabel: badgeText || product.badgeLabel,
  };
}
