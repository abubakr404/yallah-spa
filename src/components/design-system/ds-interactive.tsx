"use client";

import { useState } from "react";
import Image from "next/image";
import { Checkbox, IndicatorGroup, Radio } from "@/components/atoms";
import {
  CarouselNavButton,
  CheckboxRow,
  Chip,
  Dropdown,
  RadioGroup,
  RadioRow,
  YallahButton,
} from "@/components/molecules";
import { AppointmentPicker } from "@/components/molecules/appointment-picker";
import {
  Carousel,
  FilterSheet,
  Stepper,
  VisitDetailsSheet,
} from "@/components/organisms";
import { DsBlock } from "./ds-section";
import type { VisitDetails } from "@/types/gift-journey";

export function DsFormControlsDemo() {
  const [checks, setChecks] = useState({ a: false, b: true, c: false });
  const [place, setPlace] = useState("center");

  return (
    <div className="flex flex-col gap-7">
      <DsBlock label="صندوق اختيار (مخصص)">
        <Checkbox
          checked={checks.a}
          onCheckedChange={(v) => setChecks((s) => ({ ...s, a: v }))}
          aria-label="عادي"
        />
        <Checkbox checked disabled aria-label="محدد معطل" />
        <Checkbox checked={false} disabled aria-label="عادي معطل" />
        <CheckboxRow
          id="ds-cb-row"
          label="أوافق على الشروط"
          checked={checks.b}
          onCheckedChange={(v) => setChecks((s) => ({ ...s, b: v }))}
        />
      </DsBlock>

      <DsBlock label="راديو (مخصص)">
        <Radio checked={false} aria-label="عادي" />
        <Radio checked aria-label="محدد" />
        <Radio disabled aria-label="تعطيل" />
        <RadioGroup
          value={place}
          onValueChange={setPlace}
          className="flex flex-wrap justify-start gap-4"
        >
          <RadioRow
            id="ds-place-center"
            name="place"
            value="center"
            label="في المركز"
            checked={place === "center"}
            onSelect={setPlace}
          />
          <RadioRow
            id="ds-place-home"
            name="place"
            value="home"
            label="زيارة منزلية"
            checked={place === "home"}
            onSelect={setPlace}
          />
        </RadioGroup>
      </DsBlock>

      <DsBlock label="قائمة منسدلة (مخصصة)">
        <Dropdown
          aria-label="الفروع"
          defaultValue="all"
          options={[
            { value: "all", label: "كل الفروع" },
            { value: "riyadh", label: "الرياض" },
            { value: "jeddah", label: "جدة" },
            { value: "makkah", label: "مكة" },
          ]}
        />
      </DsBlock>

      <DsBlock label="رقاقات">
        <Chip selected>الكل</Chip>
        <Chip>باقات</Chip>
        <Chip>جلسات</Chip>
      </DsBlock>
    </div>
  );
}

export function DsStepperDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Stepper step={1} />
      <Stepper step={2} />
      <Stepper step={3} />
    </div>
  );
}

export function DsCarouselDemo({
  imageUrl,
}: {
  imageUrl: string;
}) {
  return (
    <div className="w-full max-w-md space-y-4">
      <Carousel>
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="relative aspect-[16/10] overflow-hidden rounded-lg bg-bg-muted"
          >
            <Image
              src={imageUrl}
              alt={`شريحة ${n}`}
              fill
              className="object-cover"
              sizes="400px"
            />
            <span className="absolute inset-x-0 bottom-0 bg-bg-ghost/50 px-3 py-2 text-badge text-text-inverse">
              شريحة {n}
            </span>
          </div>
        ))}
      </Carousel>
      <div className="flex items-center gap-3">
        <CarouselNavButton direction="prev" />
        <CarouselNavButton direction="next" />
        <IndicatorGroup count={3} activeIndex={0} />
      </div>
    </div>
  );
}

export function DsFilterSheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-start gap-3">
      <YallahButton type="button" onClick={() => setOpen(true)}>
        فتح ورقة التصفية
      </YallahButton>
      <p className="text-caption">
        على الهاتف: bottom sheet · على الشاشات الكبيرة: نافذة متمركزة.
      </p>
      <FilterSheet open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export function DsAppointmentPickerDemo() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border-subtle bg-bg-surface p-4">
      <p className="mb-3 text-caption text-text-secondary">
        اختيار-موعد — تقويم الشهر + أوقات متاحة
      </p>
      <AppointmentPicker />
    </div>
  );
}

export function DsVisitSheetDemo() {
  const [open, setOpen] = useState(false);
  const [visit, setVisit] = useState<VisitDetails | null>(null);
  return (
    <div className="flex flex-col items-start gap-3">
      <YallahButton type="button" onClick={() => setOpen(true)}>
        فتح ورقة المكان والموعد
      </YallahButton>
      {visit ? (
        <p className="text-caption text-brand-olive">
          {visit.place === "home" ? "زيارة منزلية" : "في المركز"} ·{" "}
          {visit.branchName} · {visit.slotLabel}
        </p>
      ) : null}
      <VisitDetailsSheet
        open={open}
        onClose={() => setOpen(false)}
        value={visit}
        onSave={setVisit}
        serviceTitle="مساج استرخاء بالزيوت العطرية"
        durationMinutes={60}
      />
    </div>
  );
}
