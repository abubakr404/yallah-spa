export type ServicePlace = "center" | "home";

export type GiftBadge = "package" | "session";

export type GiftProduct = {
  id: string;
  /** Locale-neutral structural fields; titles come from messages/Catalog. */
  title: string;
  description: string;
  priceSar: number;
  badge?: GiftBadge;
  /** Resolved badge label for the active locale (optional cache). */
  badgeLabel?: string;
  durationMinutes: number;
  serviceCount: number;
  places: ServicePlace[];
  branchCount: number;
  branchNames: string[];
  imageUrl: string;
  available: boolean;
};

export type Branch = {
  id: string;
  name: string;
  city: string;
};

export type CandidateProfile = {
  nameAr: string;
  nameEn: string;
  role: string;
  summaryAr: string;
  summaryEn: string;
  stack: string[];
  highlights: string[];
};
