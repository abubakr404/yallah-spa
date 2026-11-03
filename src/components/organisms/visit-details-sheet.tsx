"use client";

import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { YallahButton } from "@/components/molecules/button";
import { Dropdown } from "@/components/molecules/dropdown";
import {
  AppointmentPicker,
  type AppointmentSelection,
} from "@/components/molecules/appointment-picker";
import { RadioRow } from "@/components/molecules/radio-row";
import { Sheet } from "@/components/organisms/sheet";
import { BRANCH_CITY_OPTIONS } from "@/lib/branches";
import type { ServicePlace } from "@/types/gift";
import type { VisitDetails } from "@/types/gift-journey";

type VisitDetailsSheetProps = {
  open: boolean;
  onClose: () => void;
  value: VisitDetails | null;
  onSave: (visit: VisitDetails) => void;
  allowedPlaces?: ServicePlace[];
  serviceTitle?: string;
  durationMinutes?: number;
};

export function VisitDetailsSheet({
  open,
  onClose,
  value,
  onSave,
  allowedPlaces = ["center", "home"],
  serviceTitle,
  durationMinutes = 60,
}: VisitDetailsSheetProps) {
  const t = useTranslations("VisitSheet");
  const tPlaces = useTranslations("Places");
  const tBranches = useTranslations("Branches");
  const tCommon = useTranslations("Common");

  const branches = useMemo(
    () =>
      BRANCH_CITY_OPTIONS.map((b) => ({
        value: b.value,
        label: tBranches(b.value),
      })),
    [tBranches]
  );

  const [place, setPlace] = useState<ServicePlace>(
    value?.place ?? allowedPlaces[0] ?? "center"
  );
  const [branchId, setBranchId] = useState(value?.branchId ?? "makkah");
  const [appointment, setAppointment] = useState<AppointmentSelection | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setPlace(value?.place ?? allowedPlaces[0] ?? "center");
    setBranchId(value?.branchId ?? "makkah");
    setError(null);
  }, [open, value, allowedPlaces]);

  const save = () => {
    if (!appointment) {
      setError(t("errorRequired"));
      return;
    }
    const branch = branches.find((b) => b.value === branchId) ?? branches[0];
    onSave({
      place,
      branchId: branch.value,
      branchName: branch.label,
      slotLabel: `${appointment.dayLabel} · ${appointment.timeLabel}`,
    });
    onClose();
  };

  return (
    <Sheet
      open={open}
      title={t("title")}
      onClose={onClose}
      placement="responsive"
      size="lg"
      className="md:max-w-[560px]"
      footer={
        <YallahButton fullWidth type="button" onClick={save}>
          {t("confirm")}
        </YallahButton>
      }
    >
      <div className="flex flex-col gap-3.5">
        <p className="text-[12px] leading-[17px] text-[#615c52]">{t("hint")}</p>

        <div className="rounded-xl bg-bg-muted px-3 py-2.5 text-start">
          <p className="text-[13px] font-bold text-text-primary">
            {serviceTitle ?? t("defaultService")} ·{" "}
            {tCommon("minutes", { count: durationMinutes })}
          </p>
          <p className="text-[12px] text-[#615c52]">
            {t("duration", { count: durationMinutes })}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[13px] font-bold text-text-primary">
            {t("placeTitle")}
          </p>
          <p className="text-[12px] text-[#615c52]">{t("placeHint")}</p>
          <div className="flex flex-wrap justify-start gap-4">
            {allowedPlaces.includes("center") ? (
              <RadioRow
                id="visit-center"
                name="place"
                value="center"
                label={tPlaces("center")}
                checked={place === "center"}
                onSelect={() => setPlace("center")}
              />
            ) : null}
            {allowedPlaces.includes("home") ? (
              <RadioRow
                id="visit-home"
                name="place"
                value="home"
                label={tPlaces("home")}
                checked={place === "home"}
                onSelect={() => setPlace("home")}
              />
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[13px] font-bold text-text-primary">
            {t("branchPickTitle")}
          </p>
          <p className="text-[12px] text-[#615c52]">{t("branchPickHint")}</p>
          <Dropdown
            className="max-w-none"
            options={branches}
            value={branchId}
            onValueChange={setBranchId}
            aria-label={t("branchAria")}
          />
        </div>

        <AppointmentPicker
          value={appointment}
          onChange={(next) => {
            setAppointment(next);
            setError(null);
          }}
        />

        {error ? (
          <p className="text-[12px] font-medium text-danger" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </Sheet>
  );
}
