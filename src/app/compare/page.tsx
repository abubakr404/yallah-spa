import { SiteHeader } from "@/components/organisms";
import { CompareGallery } from "@/components/organisms/compare-gallery";

export default function ComparePage() {
  return (
    <div className="relative min-h-dvh bg-bg-page">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(199,173,133,0.22),_transparent_50%),linear-gradient(180deg,_#faf6f0_0%,_#ffffff_40%,_#f3eee4_100%)]"
      />
      <SiteHeader />

      <main className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
        <CompareGallery />
      </main>
    </div>
  );
}
