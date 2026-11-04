"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { IndicatorGroup } from "@/components/atoms/indicator";
import { CarouselNavButton } from "@/components/molecules/carousel-nav-button";
import { cn } from "@/lib/utils";

type ProductCarouselProps = {
  children: ReactNode[];
  className?: string;
  cardWidth?: number;
};

/**
 * Figma browse carousel — arrow + dots only (no swipe / drag).
 */
export function ProductCarousel({
  children,
  className,
  cardWidth = 305,
}: ProductCarouselProps) {
  const items = children.filter(Boolean);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const gap = 18;
  const step = (cardWidth + gap) * Math.min(2, Math.max(1, items.length));

  const measurePages = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return { count: 1, index: 0 };
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 1) return { count: 1, index: 0 };
    const count = Math.max(1, Math.round(maxScroll / step) + 1);
    const ratio = Math.abs(el.scrollLeft) / maxScroll;
    const index = Math.min(count - 1, Math.round(ratio * (count - 1)));
    return { count, index };
  }, [step]);

  const syncPage = useCallback(() => {
    const { count, index } = measurePages();
    setPageCount(count);
    setPage(index);
  }, [measurePages]);

  /**
   * Positive delta = next (more items). Chrome RTL uses positive scrollLeft
   * for that direction; if the engine ignores it, fall back to negative.
   */
  const scrollVisual = useCallback((delta: number, behavior: ScrollBehavior) => {
    const el = scrollerRef.current;
    if (!el || delta === 0) return;
    const before = el.scrollLeft;
    el.scrollBy({ left: delta, behavior });
    const tryFallback = () => {
      if (el.scrollLeft === before) {
        el.scrollBy({ left: -delta, behavior });
      }
    };
    if (behavior === "auto") {
      tryFallback();
      return;
    }
    requestAnimationFrame(tryFallback);
  }, []);

  const scrollByCards = useCallback(
    (dir: 1 | -1) => {
      scrollVisual(dir * step, "smooth");
      window.setTimeout(syncPage, 320);
    },
    [scrollVisual, step, syncPage]
  );

  const goToPage = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const target = (index / Math.max(1, pageCount - 1)) * maxScroll;
    const before = el.scrollLeft;
    el.scrollTo({ left: target, behavior: "smooth" });
    requestAnimationFrame(() => {
      if (Math.abs(el.scrollLeft - before) < 1 && target > 0) {
        el.scrollTo({ left: -target, behavior: "smooth" });
      }
    });
    setPage(index);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    syncPage();
    const ro = new ResizeObserver(syncPage);
    ro.observe(el);
    return () => ro.disconnect();
  }, [syncPage, items.length]);

  if (items.length === 0) return null;

  const atStart = page <= 0;
  const atEnd = page >= pageCount - 1;

  const navBtnClass =
    "absolute z-10 top-1/2 -translate-y-1/2 shadow-sm md:static md:translate-y-0 md:shadow-none";

  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex items-center gap-0 sm:gap-3">
        {!atStart ? (
          <CarouselNavButton
            direction="prev"
            onClick={() => scrollByCards(-1)}
            className={cn(navBtnClass, "start-2 md:start-auto")}
          />
        ) : (
          <span className="hidden size-[34px] shrink-0 md:block" aria-hidden />
        )}
        <div
          ref={scrollerRef}
          onScroll={syncPage}
          className="flex min-w-0 flex-1 gap-[18px] overflow-x-hidden overscroll-x-none scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((child, i) => (
            <div
              key={i}
              className="w-[min(100%,305px)] shrink-0 grow-0 basis-[min(100%,305px)] sm:basis-[305px]"
            >
              {child}
            </div>
          ))}
        </div>
        {!atEnd ? (
          <CarouselNavButton
            direction="next"
            onClick={() => scrollByCards(1)}
            className={cn(navBtnClass, "end-2 md:end-auto")}
          />
        ) : (
          <span className="hidden size-[34px] shrink-0 md:block" aria-hidden />
        )}
      </div>
      {pageCount > 1 ? (
        <div className="mt-1 flex w-full justify-center">
          <IndicatorGroup
            count={pageCount}
            activeIndex={page}
            onSelect={goToPage}
          />
        </div>
      ) : null}
    </div>
  );
}
