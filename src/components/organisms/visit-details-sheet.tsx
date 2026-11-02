"use client";

import { useEffect, useState } from "react";
import { YallahButton } from "@/components/molecules/button";
import { Dropdown } from "@/components/molecules/dropdown";
import { AppointmentPicker, type AppointmentSelection } from "@/components/molecules/appointment-picker";
import { RadioRow } from "@/components/molecules/radio-row";
import { Sheet } from "@/components/organisms/sheet";
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

const BRANCHES = [
  { value: "jeddah", label: "جدة" },
  { value: "yasmin", label: "الياسمين" },
  { value: "nakheel", label: "النخيل" },
  { value: "riyadh-park", label: "الرياض بارك" },
];

export function VisitDetailsSheet({
  open,
  onClose,
  value,
  onSave,
  allowedPlaces = ["center", "home"],
  serviceTitle = "خدمة هدية",
  durationMinutes = 60,
}: VisitDetailsSheetProps) {
  const [place, setPlace] = useState<ServicePlace>(
    value?.place ?? allowedPlaces[0] ?? "center"
  );
  const [branchId, setBranchId] = useState(value?.branchId ?? "jeddah");
  const [appointment, setAppointment] = useState<AppointmentSelection | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setPlace(value?.place ?? allowedPlaces[0] ?? "center");
    setBranchId(value?.branchId ?? "jeddah");
    setError(null);
  }, [open, value, allowedPlaces]);

  const save = () => {
    if (!appointment) {
      setError("اختر اليوم والوقت للمتابعة.");
      return;
    }
    const branch = BRANCHES.find((b) => b.value === branchId) ?? BRANCHES[0];
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
      title="مكان وموعد الخدمة"
      onClose={onClose}
      placement="responsive"
      size="lg"
      className="md:max-w-[560px]"
      footer={
        <YallahButton fullWidth type="button" onClick={save}>
          تأكيد المكان والموعد
        </YallahButton>
      }
    >
      <div className="flex flex-col gap-3.5">
        <p className="text-[12px] leading-[17px] text-[#615c52]">
          حدّد مكان الخدمة والفرع ثم اليوم والوقت
        </p>

        <div className="rounded-xl bg-bg-muted px-3 py-2.5 text-start">
          <p className="text-[13px] font-bold text-text-primary">
            {serviceTitle} · {durationMinutes} دقيقة
          </p>
          <p className="text-[12px] text-[#615c52]">
            المدة: {durationMinutes} دقيقة
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[13px] font-bold text-text-primary">مكان الخدمة *</p>
          <p className="text-[12px] text-[#615c52]">
            اختر أين تُقدَّم الخدمة: في المركز أو زيارة منزلية.
          </p>
          <div className="flex flex-wrap justify-start gap-4">
            {allowedPlaces.includes("center") ? (
              <RadioRow
                id="visit-center"
                name="place"
                value="center"
                label="في المركز"
                checked={place === "center"}
                onSelect={() => setPlace("center")}
              />
            ) : null}
            {allowedPlaces.includes("home") ? (
              <RadioRow
                id="visit-home"
                name="place"
                value="home"
                label="زيارة منزلية"
                checked={place === "home"}
                onSelect={() => setPlace("home")}
              />
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[13px] font-bold text-text-primary">اختيار الفرع *</p>
          <p className="text-[12px] text-[#615c52]">
            مطلوب — اختر الفرع الذي ستُقدَّم فيه الخدمة.
          </p>
          <Dropdown
            className="max-w-none"
            options={BRANCHES}
            value={branchId}
            onValueChange={setBranchId}
            aria-label="الفرع"
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
