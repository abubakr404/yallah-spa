"use client";

import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/atoms/icon";
import { cn } from "@/lib/utils";

const TIME_KEYS = ["t0", "t1", "t2", "t3", "t4", "t5", "t6"] as const;

/** JS getDay() 0=Sun … 6=Sat → Saturday-first column index. */
function saturdayFirstIndex(jsDay: number) {
  return (jsDay + 1) % 7;
}

export type AppointmentSelection = {
  date: Date;
  timeLabel: string;
  dayLabel: string;
};

type AppointmentPickerProps = {
  value?: AppointmentSelection | null;
  onChange?: (next: AppointmentSelection) => void;
  times?: string[];
  className?: string;
};

/**
 * Figma «اختيار-موعد» — month nav + day grid (LTR columns) + time chips.
 */
export function AppointmentPicker({
  value,
  onChange,
  times,
  className,
}: AppointmentPickerProps) {
  const t = useTranslations("Appointment");

  const defaultTimes = useMemo(
    () => TIME_KEYS.map((key) => t(`times.${key}`)),
    [t]
  );
  const resolvedTimes = times ?? defaultTimes;

  const weekdays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => t(`weekdays.${i}`)),
    [t]
  );

  const monthName = (monthIndex: number) => t(`months.${monthIndex}`);

  const initial = value?.date ?? new Date(2026, 10, 3);
  const [cursor, setCursor] = useState(
    () => new Date(initial.getFullYear(), initial.getMonth(), 1)
  );
  const [selectedDay, setSelectedDay] = useState(initial.getDate());
  const [selectedTime, setSelectedTime] = useState(
    value?.timeLabel ?? resolvedTimes[1] ?? resolvedTimes[0]
  );

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startCol = saturdayFirstIndex(new Date(year, month, 1).getDay());

  const days = useMemo(() => {
    const cells: (number | null)[] = Array.from({ length: startCol }, () => null);
    for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
    return cells;
  }, [daysInMonth, startCol]);

  const weekdayLabel = (day: number) =>
    weekdays[saturdayFirstIndex(new Date(year, month, day).getDay())];

  const emit = (day: number, time: string) => {
    const date = new Date(year, month, day);
    onChange?.({
      date,
      timeLabel: time,
      dayLabel: `${weekdayLabel(day)} ${day} ${monthName(month)} ${year}`,
    });
  };

  useEffect(() => {
    if (!value) emit(selectedDay, selectedTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount seed only
  }, []);

  const selectDay = (day: number) => {
    setSelectedDay(day);
    emit(day, selectedTime);
  };

  const selectTime = (time: string) => {
    setSelectedTime(time);
    emit(selectedDay, time);
  };

  return (
    <div className={cn("flex w-full flex-col gap-3 text-start", className)}>
      <div dir="ltr" className="flex items-center justify-between">
        <button
          type="button"
          aria-label={t("nextMonth")}
          className="inline-flex size-8 cursor-pointer items-center justify-center text-text-primary"
          onClick={() => setCursor(new Date(year, month + 1, 1))}
        >
          <Icon name="chevron-left" size={14} />
        </button>
        <p className="text-[15px] font-bold text-text-primary" dir="rtl">
          {monthName(month)} {year}
        </p>
        <button
          type="button"
          aria-label={t("prevMonth")}
          className="inline-flex size-8 cursor-pointer items-center justify-center text-text-primary"
          onClick={() => setCursor(new Date(year, month - 1, 1))}
        >
          <Icon name="chevron-right" size={14} />
        </button>
      </div>

      <div dir="ltr" className="grid grid-cols-7 gap-1">
        {weekdays.map((d) => (
          <div
            key={d}
            className="flex h-6 items-center justify-center text-[11px] font-medium text-[#736e61]"
          >
            {d}
          </div>
        ))}
        {days.map((day, i) =>
          day === null ? (
            <div key={`e-${i}`} />
          ) : (
            <button
              key={day}
              type="button"
              onClick={() => selectDay(day)}
              className={cn(
                "flex h-10 items-center justify-center rounded-[10px] text-sm outline-none transition-colors sm:h-12",
                selectedDay === day
                  ? "bg-brand-olive font-bold text-[#fcf7f0]"
                  : "border border-brand-sand bg-bg-surface font-medium text-text-primary hover:bg-bg-muted"
              )}
            >
              <span dir="ltr">{day}</span>
            </button>
          )
        )}
      </div>

      <p className="text-[13px] font-medium text-brand-olive">
        اليوم المحدد: {weekdayLabel(selectedDay)} {selectedDay} {monthName(month)}{" "}
        {year}
      </p>

      <p className="text-sm font-bold text-text-primary">الأوقات المتاحة</p>
      <div className="flex flex-wrap gap-2">
        {resolvedTimes.map((time) => {
          const active = selectedTime === time;
          return (
            <button
              key={time}
              type="button"
              onClick={() => selectTime(time)}
              className={cn(
                "min-w-[110px] rounded-xl px-3 py-2.5 text-[12px] outline-none transition-colors",
                active
                  ? "bg-brand-olive font-medium text-[#fcf7f0]"
                  : "border border-border-subtle bg-bg-surface font-normal text-text-primary hover:bg-bg-muted"
              )}
            >
              {time}
            </button>
          );
        })}
      </div>
      <p className="text-[13px] font-medium text-brand-olive">
        الوقت المحدد: {selectedTime}
      </p>
    </div>
  );
}
