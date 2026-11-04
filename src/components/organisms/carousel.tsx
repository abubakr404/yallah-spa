"use client";

import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { IndicatorGroup } from "@/components/atoms/indicator";
import { CarouselNavButton } from "@/components/molecules/carousel-nav-button";
import { cn } from "@/lib/utils";

type CarouselProps = {
  children: ReactNode[];
  className?: string;
  /** Auto-advance interval ms; 0 disables */
  autoPlayMs?: number;
  showDots?: boolean;
  showNav?: boolean;
};

/**
 * Gift-grid / suggestions carousel — arrows + dots only (no swipe / drag).
 * Track is LTR for transforms; chrome stays RTL.
 */
export function Carousel({
  children,
  className,
  autoPlayMs = 0,
  showDots = true,
  showNav = true,
}: CarouselProps) {
  const slides = children.filter(Boolean);
  const count = slides.length;
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(Math.max(0, Math.min(count - 1, next)));
    },
    [count]
  );

  useEffect(() => {
    if (!autoPlayMs || count < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i >= count - 1 ? 0 : i + 1));
    }, autoPlayMs);
    return () => window.clearInterval(id);
  }, [autoPlayMs, count]);

  if (count === 0) return null;

  const atStart = index <= 0;
  const atEnd = index >= count - 1;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="overflow-hidden rounded-lg" dir="ltr">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="w-full shrink-0 grow-0 basis-full" dir="rtl">
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        {showDots ? (
          <IndicatorGroup count={count} activeIndex={index} onSelect={go} />
        ) : (
          <span />
        )}
        {showNav && count > 1 ? (
          <div className="flex items-center gap-2">
            {!atStart ? (
              <CarouselNavButton
                direction="prev"
                onClick={() => go(index - 1)}
              />
            ) : null}
            {!atEnd ? (
              <CarouselNavButton
                direction="next"
                onClick={() => go(index + 1)}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
