import type { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};

/** Root shell — locale html/body live in `[locale]/layout`. */
export default function RootLayout({ children }: Props) {
  return children;
}
