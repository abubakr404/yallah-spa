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

type CarouselProps = {
  children: ReactNode[];
  className?: string;
  /** Auto-advance interval ms; 0 disables */
  autoPlayMs?: number;
  showDots?: boolean;
  showNav?: boolean;
};

/**
 * Gift-grid / suggestions carousel — swipe + dots + edge-aware arrows.
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
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    pointerId: number | null;
  }>({ active: false, startX: 0, pointerId: null });

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

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      pointerId: e.pointerId,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setDragOffset(0);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    setDragOffset(e.clientX - drag.startX);
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    drag.active = false;
    try {
      if (drag.pointerId != null) {
        e.currentTarget.releasePointerCapture(drag.pointerId);
      }
    } catch {
      /* already released */
    }
    const delta = e.clientX - drag.startX;
    setDragging(false);
    setDragOffset(0);
    const threshold = 48;
    if (delta <= -threshold) go(index + 1);
    else if (delta >= threshold) go(index - 1);
  };

  if (count === 0) return null;

  const atStart = index <= 0;
  const atEnd = index >= count - 1;

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-lg select-none",
          dragging ? "cursor-grabbing" : "cursor-grab"
        )}
        dir="ltr"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className={cn(
            "flex ease-out",
            dragging ? "transition-none" : "transition-transform duration-300"
          )}
          style={{
            transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))`,
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
          <IndicatorGroup
            count={count}
            activeIndex={index}
            onSelect={go}
          />
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
