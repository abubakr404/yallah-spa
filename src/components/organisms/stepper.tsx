"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type StepperProps = {
  /** 1-based current step */
  step: 1 | 2 | 3;
  className?: string;
  labels?: [string, string, string];
};

type DotState = "idle" | "active" | "done";

function StepDot({ state }: { state: DotState }) {
  if (state === "active") {
    return (
      <span
        aria-hidden
        className="size-3 shrink-0 rounded-full bg-brand-olive ring-2 ring-brand-sand-ring ring-offset-0"
      />
    );
  }
  if (state === "done") {
    return (
      <span aria-hidden className="size-3 shrink-0 rounded-full bg-brand-olive" />
    );
  }
  return (
    <span
      aria-hidden
      className="size-2.5 shrink-0 rounded-full border-[1.5px] border-border-subtle bg-transparent"
    />
  );
}

/**
 * Figma «شريط-خطوات» — اختار → خصص → راجع سلتك
 */
export function Stepper({ step, className, labels }: StepperProps) {
  const t = useTranslations("Stepper");
  const resolved = labels ?? [t("choose"), t("personalize"), t("review")];

  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-center justify-center gap-0",
        className
      )}
      role="navigation"
      aria-label={t("aria")}
    >
      {resolved.map((label, index) => {
        const n = (index + 1) as 1 | 2 | 3;
        const state: DotState =
          n < step ? "done" : n === step ? "active" : "idle";
        const connectorActive = n < step;
        const isLast = index === resolved.length - 1;

        return (
          <div key={`${label}-${index}`} className="flex items-center">
            <div className="flex items-center gap-2 px-1">
              <StepDot state={state} />
              <span
                className={cn(
                  "whitespace-nowrap text-[12px] leading-normal",
                  state === "idle"
                    ? "font-normal text-[#615c52]"
                    : "font-medium text-brand-olive"
                )}
              >
                {label}
              </span>
            </div>
            {!isLast ? (
              <span
                aria-hidden
                className={cn(
                  "mx-1 h-0.5 w-10 sm:w-14",
                  connectorActive ? "bg-brand-olive" : "bg-border-subtle"
                )}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
