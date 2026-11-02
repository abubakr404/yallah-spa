export type ServicePlace = "center" | "home";

export type GiftProduct = {
  id: string;
  title: string;
  description: string;
  priceSar: number;
  badge?: string;
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
