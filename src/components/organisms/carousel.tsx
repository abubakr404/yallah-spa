"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselNavButton } from "@/components/molecules/carousel-nav-button";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/pagination";

type CarouselProps = {
  children: ReactNode[];
  className?: string;
  /** Auto-advance interval ms; 0 disables */
  autoPlayMs?: number;
  showDots?: boolean;
  showNav?: boolean;
};

/**
 * Single-slide carousel via Swiper — custom arrows + Swiper pagination.
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
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const paginationRef = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    if (!swiper) return;
    if (autoPlayMs > 0 && count > 1) {
      swiper.autoplay?.start();
    } else {
      swiper.autoplay?.stop();
    }
  }, [swiper, autoPlayMs, count]);

  if (count === 0) return null;

  const syncEdges = (instance: SwiperInstance) => {
    setAtStart(instance.isBeginning);
    setAtEnd(instance.isEnd);
  };

  return (
    <div className={cn("yallah-swiper relative w-full", className)}>
      <Swiper
        key={dir}
        className="overflow-hidden rounded-lg"
        modules={[A11y, Autoplay, Pagination]}
        dir={dir}
        slidesPerView={1}
        spaceBetween={0}
        autoplay={
          autoPlayMs > 0
            ? { delay: autoPlayMs, disableOnInteraction: false }
            : false
        }
        pagination={
          showDots
            ? {
                clickable: true,
                el: paginationRef.current,
              }
            : false
        }
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
        onReachBeginning={syncEdges}
        onReachEnd={syncEdges}
        onFromEdge={syncEdges}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="!h-auto">
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-3 flex items-center justify-between gap-3">
        {showDots ? (
          <div
            ref={paginationRef}
            className="yallah-swiper-pagination !w-auto"
          />
        ) : (
          <span />
        )}
        {showNav && count > 1 ? (
          <div className="hidden items-center gap-2 md:flex">
            {!atStart ? (
              <CarouselNavButton
                direction="prev"
                onClick={() => swiper?.slidePrev()}
              />
            ) : null}
            {!atEnd ? (
              <CarouselNavButton
                direction="next"
                onClick={() => swiper?.slideNext()}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
