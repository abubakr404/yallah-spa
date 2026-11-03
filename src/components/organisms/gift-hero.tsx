"use client";

import Image from "next/image";
import Link from "next/link";
import { YallahButton } from "@/components/molecules/button";
import { cn } from "@/lib/utils";

type GiftHeroProps = {
  className?: string;
  onAssist?: () => void;
};

/** Figma Desktop Browse «Hero» — full-bleed image + soft dim + dual CTAs. */
export function GiftHero({ className, onAssist }: GiftHeroProps) {
  return (
    <section
      className={cn(
        "relative flex h-[236px] w-full items-center justify-center overflow-hidden",
        className
      )}
    >
      <Image
        src="/assets/images/hero-gift.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[rgba(13,15,10,0.22)] via-[rgba(13,15,10,0.38)] to-[rgba(13,15,10,0.5)]"
      />
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <h1 className="text-[28px] font-bold leading-normal text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)] sm:text-[32px]">
          أهدِ من تحب لحظة استرخاء
        </h1>
        <p className="max-w-xl text-[15px] font-medium leading-normal text-[#f5f0e5] drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]">
          اختر هدية مميزة، خصّص بطاقتها، وشاركها مع من تحب.
        </p>
        <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
          <YallahButton asChild className="h-12 min-w-[170px]">
            <Link href="/gifts/search">ابحث عن هدايا</Link>
          </YallahButton>
          <YallahButton
            type="button"
            variant="ghost"
            className="h-12 min-w-0 border-white bg-[rgba(75,77,58,0.35)] px-5 sm:min-w-[200px] sm:px-[22px] hover:bg-[rgba(75,77,58,0.5)]"
            onClick={onAssist}
          >
            <span className="sm:hidden">ساعدني أختار</span>
            <span className="hidden sm:inline">ساعدني أختار هدية</span>
          </YallahButton>
        </div>
      </div>
    </section>
  );
}
