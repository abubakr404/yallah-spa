import { mockGiftProducts } from "@/data/mocks/gifts";
import { splitInclusiveTax } from "@/lib/gift-journey/pricing";
import { ApiError } from "@/types/api";
import type { GiftDraft, GiftOrderSummary } from "@/types/gift-journey";
import { apiRequest } from "./client";

export type CreateGiftOrderPayload = {
  draft: GiftDraft;
  acceptTerms: boolean;
};

/** POST /orders/gifts — create gift order from personalize draft. */
export async function createGiftOrder(payload: CreateGiftOrderPayload) {
  return apiRequest<GiftOrderSummary>("/orders/gifts", {
    method: "POST",
    body: payload,
    mockResolver: () => {
      if (!payload.acceptTerms) {
        throw new ApiError(400, {
          code: "TERMS_REQUIRED",
          message: "يجب الموافقة على الشروط والأحكام",
        });
      }
      const product = mockGiftProducts.find((g) => g.id === payload.draft.giftId);
      if (!product) {
        throw new ApiError(404, {
          code: "GIFT_NOT_FOUND",
          message: `Gift ${payload.draft.giftId} was not found`,
        });
      }
      if (!payload.draft.recipientName.trim() || !payload.draft.senderName.trim()) {
        throw new ApiError(400, {
          code: "DRAFT_INCOMPLETE",
          message: "بيانات المستفيد أو المُهدي ناقصة",
        });
      }
      if (!payload.draft.visit) {
        throw new ApiError(400, {
          code: "VISIT_REQUIRED",
          message: "يجب تحديد مكان وموعد الخدمة",
        });
      }

      const pricing = splitInclusiveTax(product.priceSar);
      const order: GiftOrderSummary = {
        orderId: `YS-GFT-${Date.now().toString().slice(-8)}`,
        draft: payload.draft,
        product,
        serviceCount: 1,
        giftCount: 1,
        directBookingCount: 0,
        ...pricing,
        createdAt: new Date().toISOString(),
      };
      return { data: order };
    },
  });
}
