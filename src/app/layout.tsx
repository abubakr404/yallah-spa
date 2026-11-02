import type { Metadata } from "next";
import { Geist_Mono, Tajawal } from "next/font/google";
import { DirectionProvider } from "@/components/providers/direction-provider";
import "./globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Yallah Spa · Gift Redesign",
    template: "%s · Yallah Spa",
  },
  description:
    "Interview test — Yallah Spa gift page redesign with Atomic Design, Next.js, Tailwind, and shadcn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <DirectionProvider>{children}</DirectionProvider>
      </body>
    </html>
  );
}
