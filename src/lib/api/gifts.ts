import { mockGiftProducts } from "@/data/mocks/gifts";
import { ApiError } from "@/types/api";
import type { GiftProduct } from "@/types/gift";
import { apiRequest } from "./client";

export type ListGiftsParams = {
  q?: string;
  availableOnly?: boolean;
};

/** GET /gifts — list gift catalog items. */
export async function fetchGifts(params: ListGiftsParams = {}) {
  return apiRequest<GiftProduct[]>("/gifts", {
    mockResolver: () => {
      let items = [...mockGiftProducts];
      if (params.availableOnly) {
        items = items.filter((g) => g.available);
      }
      if (params.q?.trim()) {
        const q = params.q.trim();
        items = items.filter(
          (g) => g.title.includes(q) || g.description.includes(q)
        );
      }
      return {
        data: items,
        meta: { total: items.length, page: 1, pageSize: items.length },
      };
    },
  });
}

/** GET /gifts/:id */
export async function fetchGiftById(id: string) {
  return apiRequest<GiftProduct>(`/gifts/${id}`, {
    mockResolver: () => {
      const item = mockGiftProducts.find((g) => g.id === id);
      if (!item) {
        throw new ApiError(404, {
          code: "GIFT_NOT_FOUND",
          message: `Gift ${id} was not found`,
        });
      }
      return { data: item };
    },
  });
}
