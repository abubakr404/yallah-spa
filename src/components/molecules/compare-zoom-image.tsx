"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

type CompareZoomImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  frameClassName?: string;
};

export function CompareZoomImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  frameClassName,
}: CompareZoomImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          frameClassName ??
          "group relative block w-full cursor-zoom-in overflow-hidden text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-olive/40"
        }
        aria-label={`تكبير الصورة: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className ?? "h-auto w-full object-contain object-top"}
          sizes={sizes}
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-3 py-2 text-center text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100">
          اضغط للتكبير
        </span>
      </button>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src, alt }]}
        plugins={[Zoom]}
        carousel={{ finite: true }}
        render={{ buttonPrev: () => null, buttonNext: () => null }}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
}
