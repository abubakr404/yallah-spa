"use client";

import { useState, type ReactNode } from "react";
import { YallahButton } from "@/components/molecules/button";
import { Chip } from "@/components/molecules/chip";
import { Dropdown } from "@/components/molecules/dropdown";
import { Sheet } from "@/components/organisms/sheet";

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

const branches = [
  { value: "all", label: "كل الفروع" },
  { value: "makkah", label: "مكة" },
  { value: "jeddah", label: "جدة" },
  { value: "taif", label: "الطائف" },
  { value: "riyadh", label: "الرياض" },
  { value: "dammam", label: "الدمام" },
];

/**
 * Figma «ورقة-تصفية» — ready for gift browse filters.
 * Interactive showcase; pages will wire real filter state later.
 */
export function FilterSheet({ open = true, onClose, onApply }: FilterSheetProps) {
  const [giftType, setGiftType] = useState("all");
  const [branch, setBranch] = useState("all");
  const [place, setPlace] = useState("all");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("all");

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
      title="تصفية الهدايا"
      onClose={onClose}
      placement="responsive"
      size="sm"
      className="md:max-w-[390px]"
      footer={
        <div className="flex gap-2">
          <YallahButton
            fullWidth
            onClick={() =>
              onApply?.({ giftType, branch, place, service, budget })
            }
          >
            تطبيق التصفية
          </YallahButton>
          <button
            type="button"
            onClick={clear}
            className="inline-flex h-11 w-[110px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-brand-olive text-button text-brand-olive"
          >
            مسح
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <Section label="نوع الهدية">
          <ChipRow
            value={giftType}
            onChange={setGiftType}
            options={[
              { value: "all", label: "الكل" },
              { value: "packages", label: "باقات" },
              { value: "sessions", label: "جلسات" },
            ]}
          />
        </Section>

        <Section label="الفرع / موقع المستفيد">
          <Dropdown
            className="max-w-none"
            options={branches}
            value={branch}
            onValueChange={setBranch}
            aria-label="الفرع"
          />
        </Section>

        <Section label="مكان الخدمة">
          <ChipRow
            value={place}
            onChange={setPlace}
            options={[
              { value: "all", label: "الكل" },
              { value: "home", label: "منزلية" },
              { value: "center", label: "في المركز" },
            ]}
          />
        </Section>

        <Section label="نوع الخدمة">
          <ChipRow
            value={service}
            onChange={setService}
            options={[
              { value: "massage", label: "مساج" },
              { value: "bath", label: "حمام" },
              { value: "skin", label: "بشرة" },
              { value: "pedi", label: "بدكير" },
            ]}
          />
        </Section>

        <Section label="الميزانية">
          <ChipRow
            value={budget}
            onChange={setBudget}
            options={[
              { value: "all", label: "الكل" },
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
