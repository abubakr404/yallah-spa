import { mockCandidateProfile } from "@/data/mocks/profile";
import type { CandidateProfile } from "@/types/gift";
import { apiRequest } from "./client";

/** GET /candidate/profile — welcome page intro (mock). */
export async function fetchCandidateProfile() {
  return apiRequest<CandidateProfile>("/candidate/profile", {
    instant: true,
    mockResolver: () => ({ data: mockCandidateProfile }),
  });
}
