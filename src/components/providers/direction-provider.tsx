"use client";

import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction";
import type { ReactNode } from "react";

export function DirectionProvider({
  children,
  dir,
}: {
  children: ReactNode;
  dir: "rtl" | "ltr";
}) {
  return <RadixDirectionProvider dir={dir}>{children}</RadixDirectionProvider>;
}
