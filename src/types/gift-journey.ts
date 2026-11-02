import type { GiftProduct, ServicePlace } from "@/types/gift";

export type CardThemeId = "olive" | "gold" | "floral";

export type VisitDetails = {
  place: ServicePlace;
  branchId: string;
  branchName: string;
  slotLabel: string;
};

export type GiftDraft = {
  giftId: string;
  recipientName: string;
  senderName: string;
  message: string;
  theme: CardThemeId;
  visit: VisitDetails | null;
};

export type GiftOrderSummary = {
  orderId: string;
  draft: GiftDraft;
  product: GiftProduct;
  serviceCount: number;
  giftCount: number;
  directBookingCount: number;
  subtotalSar: number;
  taxSar: number;
  totalSar: number;
  createdAt: string;
};

/** Default gift message — suitable for any occasion. */
export const DEFAULT_GIFT_MESSAGE =
  "أتمنى لكِ لحظات مليئة بالهدوء والاسترخاء — هذه هدية من القلب لتستحقيها بكل حب.";

export const MESSAGE_PRESETS = [
  {
    id: "default",
    label: "رسالة عامة",
    text: DEFAULT_GIFT_MESSAGE,
  },
  {
    id: "birthday",
    label: "عيد ميلاد سعيد",
    text: "كل عام وأنتِ بخير، أتمنى لكِ لحظات مليئة بالهدوء والاسترخاء.",
  },
  {
    id: "thanks",
    label: "شكرًا لكِ",
    text: "شكرًا لكِ من القلب — أتمنى أن تمنحك هذه الهدية لحظات راحة تستحقينها.",
  },
  {
    id: "relax",
    label: "استرخي قليلًا",
    text: "استرخي قليلًا… هذه دعوة لتهدئة الجسد واستعادة التوازن.",
  },
  {
    id: "success",
    label: "مبروك النجاح",
    text: "مبروك النجاح! احتفلي بلحظة هدوء واسترخاء تستحقينها.",
  },
] as const;

/**
 * Figma theme tokens — swatch chips (131:521) vs live voucher cards.
 * Olive = dark card; Gold/Floral = light cards.
 */
export const CARD_THEMES: {
  id: CardThemeId;
  label: string;
  mode: "dark" | "light";
  /** Picker chip */
  swatchBg: string;
  swatchText: string;
  swatchBorder: string;
  swatchBorderSelected: string;
  /** Voucher card */
  surface: string;
  border: string;
  accent: string;
  brand: string;
  heading: string;
  muted: string;
  quote: string;
  footer: string;
}[] = [
  {
    id: "olive",
    label: "الزيتوني",
    mode: "dark",
    swatchBg: "#4b4d3a",
    swatchText: "#fcf7f0",
    swatchBorder: "#d6d1c2",
    swatchBorderSelected: "#2d2e23",
    surface: "#4b4d3a",
    border: "#b89452",
    accent: "#b89452",
    brand: "#b89452",
    heading: "#fcf7f0",
    muted: "#ebe0c7",
    quote: "#fcf7f0",
    footer: "#faf2e5",
  },
  {
    id: "gold",
    label: "الذهبي",
    mode: "light",
    swatchBg: "#faf2e5",
    swatchText: "#b89452",
    swatchBorder: "#d6d1c2",
    swatchBorderSelected: "#b89452",
    surface: "#faf2e5",
    border: "#b89452",
    accent: "#b89452",
    brand: "#b89452",
    heading: "#4b4d3a",
    muted: "#615c52",
    quote: "#292924",
    footer: "#fcf7ed",
  },
  {
    id: "floral",
    label: "الزهور",
    mode: "light",
    swatchBg: "#f5ebed",
    swatchText: "#8c5966",
    swatchBorder: "#d6d1c2",
    swatchBorderSelected: "#8c5966",
    surface: "#f5ebed",
    border: "#8c5966",
    accent: "#8c5966",
    brand: "#8c5966",
    heading: "#4b4d3a",
    muted: "#615c52",
    quote: "#292924",
    footer: "#fcf7f0",
  },
];
