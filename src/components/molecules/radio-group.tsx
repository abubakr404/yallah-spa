"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RadioGroupContextValue = {
  value: string;
  name?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroup() {
  return useContext(RadioGroupContext);
}

type RadioGroupProps = {
  value?: string;
  defaultValue?: string;
  name?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  className?: string;
  children: ReactNode;
};

export function RadioGroup({
  value: controlled,
  defaultValue = "",
  name,
  disabled,
  onValueChange,
  className,
  children,
}: RadioGroupProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = controlled ?? uncontrolled;

  return (
    <RadioGroupContext.Provider
      value={{
        value,
        name,
        disabled,
        onChange: (next) => {
          if (controlled === undefined) setUncontrolled(next);
          onValueChange?.(next);
        },
      }}
    >
      <div role="radiogroup" className={cn(className)}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}
