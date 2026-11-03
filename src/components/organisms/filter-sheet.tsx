"use client";

import { useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";
import { YallahButton } from "@/components/molecules/button";
import { Chip } from "@/components/molecules/chip";
import { Dropdown } from "@/components/molecules/dropdown";
import { Sheet } from "@/components/organisms/sheet";
import { BRANCH_CITY_OPTIONS } from "@/lib/branches";

type FilterSheetProps = {
  open?: boolean;
  onClose?: () => void;
  onApply?: (filters: FilterState) => void;
};

export type FilterState = {
  giftType: string;
  branch: string;
  place: string;
  service: string;
  budget: string;
};

/**
 * Figma «ورقة-تصفية» — ready for gift browse filters.
 */
export function FilterSheet({ open = true, onClose, onApply }: FilterSheetProps) {
  const t = useTranslations("FilterSheet");
  const tCommon = useTranslations("Common");
  const tPlaces = useTranslations("Places");
  const tBranches = useTranslations("Branches");
  const [giftType, setGiftType] = useState("all");
  const [branch, setBranch] = useState("all");
  const [place, setPlace] = useState("all");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("all");

  const branches = [
    { value: "all", label: tBranches("all") },
    ...BRANCH_CITY_OPTIONS.map((b) => ({
      value: b.value,
      label: tBranches(b.value),
    })),
  ];

  const clear = () => {
    setGiftType("all");
    setBranch("all");
    setPlace("all");
    setService("");
    setBudget("all");
  };

  return (
    <Sheet
      open={open}
      title={t("title")}
      onClose={onClose}
      placement="responsive"
      size="sm"
      className="md:max-w-[390px]"
      footer={
        <div className="flex gap-2">
          <button
            type="button"
            onClick={clear}
            className="inline-flex h-11 w-[110px] shrink-0 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-brand-olive text-button text-brand-olive"
          >
            {t("clear")}
          </button>
          <YallahButton
            fullWidth
            onClick={() =>
              onApply?.({ giftType, branch, place, service, budget })
            }
          >
            {t("apply")}
          </YallahButton>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <Section label={t("giftType")}>
          <ChipRow
            value={giftType}
            onChange={setGiftType}
            options={[
              { value: "all", label: tCommon("all") },
              { value: "packages", label: t("packages") },
              { value: "sessions", label: t("sessions") },
            ]}
          />
        </Section>

        <Section label={t("branch")}>
          <Dropdown
            className="max-w-none"
            options={branches}
            value={branch}
            onValueChange={setBranch}
            aria-label={t("branchAria")}
          />
        </Section>

        <Section label={t("place")}>
          <ChipRow
            value={place}
            onChange={setPlace}
            options={[
              { value: "all", label: tCommon("all") },
              { value: "home", label: tPlaces("homeShort") },
              { value: "center", label: tPlaces("center") },
            ]}
          />
        </Section>

        <Section label={t("serviceType")}>
          <ChipRow
            value={service}
            onChange={setService}
            options={[
              { value: "massage", label: t("massage") },
              { value: "bath", label: t("bath") },
              { value: "skin", label: t("skin") },
              { value: "pedi", label: t("pedi") },
            ]}
          />
        </Section>

        <Section label={t("budget")}>
          <ChipRow
            value={budget}
            onChange={setBudget}
            options={[
              { value: "all", label: t("budgetAny") },
              { value: "lte300", label: "300≤" },
              { value: "300-500", label: "300–500" },
              { value: "gt500", label: "500>" },
            ]}
          />
        </Section>
      </div>
    </Sheet>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-body-sm font-bold text-brand-olive">{label}</p>
      {children}
    </div>
  );
}

function ChipRow({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap justify-start gap-1.5">
      {options.map((opt) => (
        <Chip
          key={opt.value}
          selected={value === opt.value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </Chip>
      ))}
    </div>
  );
}
