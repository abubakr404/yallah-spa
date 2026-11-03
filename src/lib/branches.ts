/** Cities shown in branch pickers across the gift journey. */
export const BRANCH_CITY_OPTIONS = [
  { value: "makkah", label: "مكة" },
  { value: "jeddah", label: "جدة" },
  { value: "riyadh", label: "الرياض" },
] as const;

export const BRANCH_CITY_OPTIONS_WITH_ALL = [
  { value: "all", label: "كل الفروع" },
  ...BRANCH_CITY_OPTIONS,
] as const;
