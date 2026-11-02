import {
  DEFAULT_GIFT_MESSAGE,
  type GiftDraft,
  type GiftOrderSummary,
} from "@/types/gift-journey";

const DRAFT_KEY = "yallah.gift.draft";
const ORDER_KEY = "yallah.gift.lastOrder";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
}

export function createEmptyDraft(giftId: string): GiftDraft {
  return {
    giftId,
    recipientName: "",
    senderName: "",
    message: DEFAULT_GIFT_MESSAGE,
    theme: "olive",
    visit: null,
  };
}

export function loadGiftDraft(): GiftDraft | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GiftDraft;
  } catch {
    return null;
  }
}

export function saveGiftDraft(draft: GiftDraft) {
  if (!canUseStorage()) return;
  window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function clearGiftDraft() {
  if (!canUseStorage()) return;
  window.sessionStorage.removeItem(DRAFT_KEY);
}

export function loadLastOrder(): GiftOrderSummary | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.sessionStorage.getItem(ORDER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GiftOrderSummary;
  } catch {
    return null;
  }
}

export function saveLastOrder(order: GiftOrderSummary) {
  if (!canUseStorage()) return;
  window.sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
}
