"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
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
 * Figma browse carousel — swipe (touch/mouse) moves the same step as arrows.
 */
export function ProductCarousel({
  children,
  className,
  cardWidth = 305,
}: ProductCarouselProps) {
  const items = children.filter(Boolean);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    startScroll: number;
    pointerId: number | null;
    moved: boolean;
  }>({
    active: false,
    startX: 0,
    startScroll: 0,
    pointerId: null,
    moved: false,
  });
  const [page, setPage] = useState(0);
  const [dragging, setDragging] = useState(false);
  const pageCount = Math.max(1, Math.ceil(items.length / 3));
  const gap = 18;
  const step = (cardWidth + gap) * Math.min(2, Math.max(1, items.length));

  const syncPage = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setPage(0);
      return;
    }
    const ratio = Math.abs(el.scrollLeft) / maxScroll;
    setPage(Math.min(pageCount - 1, Math.round(ratio * (pageCount - 1))));
  }, [pageCount]);

  /** Scroll by visual delta: positive = next (toward more items / visual left in RTL). */
  const scrollVisual = useCallback((delta: number, behavior: ScrollBehavior) => {
    const el = scrollerRef.current;
    if (!el || delta === 0) return;
    const before = el.scrollLeft;
    // Most RTL engines: next content → decrease scrollLeft (negative direction)
    el.scrollBy({ left: -delta, behavior });
    if (behavior === "auto") {
      if (el.scrollLeft === before) {
        el.scrollBy({ left: delta, behavior });
      }
      return;
    }
    requestAnimationFrame(() => {
      if (el.scrollLeft === before) {
        el.scrollBy({ left: delta, behavior });
      }
    });
  }, []);

  /** dir +1 = next, -1 = prev — shared by arrows and swipe. */
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
    el.scrollTo({ left: -target, behavior: "smooth" });
    requestAnimationFrame(() => {
      if (Math.abs(el.scrollLeft - before) < 1 && target > 0) {
        el.scrollTo({ left: target, behavior: "smooth" });
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

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      pointerId: e.pointerId,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const el = scrollerRef.current;
    if (!drag.active || !el) return;
    const dx = e.clientX - drag.startX;
    if (Math.abs(dx) > 6) drag.moved = true;
    const isRtl = getComputedStyle(el).direction === "rtl";
    // Finger right (dx>0): reveal previous in RTL → scrollLeft increases toward 0
    el.scrollLeft = isRtl ? drag.startScroll + dx : drag.startScroll - dx;
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const el = scrollerRef.current;
    if (!drag.active) return;
    drag.active = false;
    if (el && drag.pointerId != null) {
      try {
        el.releasePointerCapture(drag.pointerId);
      } catch {
        /* already released */
      }
    }
    setDragging(false);

    const dx = e.clientX - drag.startX;
    const threshold = Math.min(72, step * 0.25);
    if (el) {
      // Return to drag start, then apply the same step as arrow buttons
      el.scrollLeft = drag.startScroll;
    }
    if (drag.moved && Math.abs(dx) >= threshold) {
      // Swipe left (dx<0) → next; swipe right → prev
      scrollByCards(dx < 0 ? 1 : -1);
    } else {
      syncPage();
    }
  };

  if (items.length === 0) return null;

  const atStart = page <= 0;
  const atEnd = page >= pageCount - 1;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-2 sm:gap-3">
        <CarouselNavButton
          direction="prev"
          onClick={() => scrollByCards(-1)}
          disabled={items.length < 2 || atStart}
        />
        <div
          ref={scrollerRef}
          onScroll={syncPage}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={cn(
            "flex min-w-0 flex-1 gap-[18px] overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "touch-pan-x snap-x snap-mandatory select-none",
            dragging
              ? "cursor-grabbing scroll-auto"
              : "cursor-grab scroll-smooth"
          )}
          style={{ touchAction: "pan-x" }}
        >
          {items.map((child, i) => (
            <div
              key={i}
              className="w-[min(100%,305px)] shrink-0 grow-0 basis-[305px] snap-start"
            >
              {child}
            </div>
          ))}
        </div>
        <CarouselNavButton
          direction="next"
          onClick={() => scrollByCards(1)}
          disabled={items.length < 2 || atEnd}
        />
      </div>
      <div className="mt-1 flex w-full justify-center">
        <IndicatorGroup
          count={pageCount}
          activeIndex={page}
          onSelect={goToPage}
        />
      </div>
    </div>
  );
}
