"use client";

import { useLocale } from "next-intl";
import { useRef, useState, type ReactNode } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselNavButton } from "@/components/molecules/carousel-nav-button";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/pagination";

type ProductCarouselProps = {
  children: ReactNode[];
  className?: string;
  cardWidth?: number;
};

/**
 * Figma browse carousel — Swiper + custom arrows + Swiper pagination (styled).
 */
export function ProductCarousel({
  children,
  className,
  cardWidth = 305,
}: ProductCarouselProps) {
  const items = children.filter(Boolean);
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const paginationRef = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  if (items.length === 0) return null;

  const syncEdges = (instance: SwiperInstance) => {
    setAtStart(instance.isBeginning);
    setAtEnd(instance.isEnd);
  };

  const navBtnClass =
    "absolute z-10 top-1/2 -translate-y-1/2 shadow-sm md:static md:translate-y-0 md:shadow-none";

  return (
    <div className={cn("yallah-swiper w-full", className)}>
      <div className="relative flex items-center gap-0 sm:gap-3">
        {!atStart ? (
          <CarouselNavButton
            direction="prev"
            onClick={() => swiper?.slidePrev()}
            className={cn(navBtnClass, "start-2 md:start-auto")}
          />
        ) : (
          <span className="hidden size-[34px] shrink-0 md:block" aria-hidden />
        )}

        <Swiper
          key={dir}
          className="min-w-0 flex-1 !overflow-hidden !pb-0"
          modules={[Pagination, A11y]}
          dir={dir}
          slidesPerView="auto"
          spaceBetween={18}
          watchOverflow
          resistanceRatio={0.65}
          pagination={{
            clickable: true,
            el: paginationRef.current,
          }}
          onBeforeInit={(instance) => {
            const pagination = instance.params.pagination;
            if (pagination && typeof pagination !== "boolean") {
              pagination.el = paginationRef.current;
            }
          }}
          onSwiper={(instance) => {
            setSwiper(instance);
            syncEdges(instance);
          }}
          onSlideChange={syncEdges}
          onResize={syncEdges}
          onUpdate={syncEdges}
          onReachBeginning={syncEdges}
          onReachEnd={syncEdges}
          onFromEdge={syncEdges}
        >
          {items.map((child, i) => (
            <SwiperSlide
              key={i}
              className="!h-auto"
              style={{ width: `min(100%, ${cardWidth}px)` }}
            >
              {child}
            </SwiperSlide>
          ))}
        </Swiper>

        {!atEnd ? (
          <CarouselNavButton
            direction="next"
            onClick={() => swiper?.slideNext()}
            className={cn(navBtnClass, "end-2 md:end-auto")}
          />
        ) : (
          <span className="hidden size-[34px] shrink-0 md:block" aria-hidden />
        )}
      </div>

      <div ref={paginationRef} className="yallah-swiper-pagination" />
    </div>
  );
}
