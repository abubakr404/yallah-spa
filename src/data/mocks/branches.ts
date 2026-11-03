import type { Branch } from "@/types/gift";

/** Cities available for gift booking — مكة / جدة / الرياض only. */
export const mockBranches: Branch[] = [
  { id: "br-makkah", name: "مكة", city: "مكة" },
  { id: "br-jeddah", name: "جدة", city: "جدة" },
  { id: "br-riyadh", name: "الرياض", city: "الرياض" },
];
