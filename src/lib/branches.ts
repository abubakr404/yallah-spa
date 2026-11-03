/** Cities shown in branch pickers across the gift journey (labels via `Branches`). */
export const BRANCH_CITY_OPTIONS = [
  { value: "makkah" },
  { value: "jeddah" },
  { value: "riyadh" },
] as const;

export const BRANCH_CITY_OPTION_VALUES = [
  "all",
  ...BRANCH_CITY_OPTIONS.map((b) => b.value),
] as const;

export type BranchCityValue = (typeof BRANCH_CITY_OPTIONS)[number]["value"];
