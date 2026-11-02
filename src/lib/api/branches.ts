import { mockBranches } from "@/data/mocks/branches";
import type { Branch } from "@/types/gift";
import { apiRequest } from "./client";

/** GET /branches */
export async function fetchBranches() {
  return apiRequest<Branch[]>("/branches", {
    mockResolver: () => ({
      data: mockBranches,
      meta: { total: mockBranches.length },
    }),
  });
}
