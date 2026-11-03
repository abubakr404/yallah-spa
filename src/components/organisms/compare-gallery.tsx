"use client";

import Link from "next/link";
import { CompareZoomImage } from "@/components/molecules/compare-zoom-image";
import { YallahButton } from "@/components/molecules";

type Shot = {
  src: string;
  alt: string;
  label: string;
};

type Pair = {
  id: string;
  title: string;
  subtitle: string;
  device: "mobile" | "desktop";
  before: Shot;
  after: Shot;
};

type JourneyShot = {
  id: string;
  title: string;
  step: string;
  device: "mobile" | "desktop";
  src: string;
  alt: string;
};

const PAIRS: Pair[] = [
  {
    id: "mobile-browse",
    title: "تصفّح الإهداء — موبايل",
    subtitle: "من شاشة فارغة تعتمد على الفرع إلى هيرو وباقات وجلسات واضحة.",
    device: "mobile",
    before: {
      src: "/assets/images/compare/before-mobile-gift-empty.png",
      alt: "الشاشة القديمة لصفحة الإهداء على الموبايل",
      label: "قبل",
    },
    after: {
      src: "/assets/images/compare/after-mobile-browse.png",
      alt: "الشاشة الجديدة لصفحة الإهداء على الموبايل",
      label: "بعد",
    },
  },
  {
    id: "desktop-browse",
    title: "تصفّح الإهداء — ديسكتوب",
    subtitle: "هيرو أوضح وكاروسيل باقات وجلسات بدل الحالة الفارغة.",
    device: "desktop",
    before: {
      src: "/assets/images/compare/before-desktop-gift-empty.png",
      alt: "الشاشة القديمة لصفحة الإهداء على الديسكتوب",
      label: "قبل",
    },
    after: {
      src: "/assets/images/compare/after-desktop-browse.png",
      alt: "الشاشة الجديدة لصفحة الإهداء على الديسكتوب",
      label: "بعد",
    },
  },
  {
    id: "mobile-search",
    title: "بحث الهدايا — موبايل",
    subtitle: "نتائج أوضح مع فلتر وترقيم صفحات متوافق مع RTL.",
    device: "mobile",
    before: {
      src: "/assets/images/compare/before-mobile-search-list.png",
      alt: "قائمة نتائج البحث القديمة على الموبايل",
      label: "قبل",
    },
    after: {
      src: "/assets/images/compare/after-mobile-search.png",
      alt: "صفحة البحث الجديدة على الموبايل",
      label: "بعد",
    },
  },
  {
    id: "desktop-search",
    title: "بحث الهدايا — ديسكتوب",
    subtitle: "شبكة نتائج، فلتر، وترقيم صفحات متوافق مع العربية.",
    device: "desktop",
    before: {
      src: "/assets/images/compare/before-desktop-gift-grid.png",
      alt: "شبكة الباقات القديمة على الديسكتوب",
      label: "قبل",
    },
    after: {
      src: "/assets/images/compare/after-desktop-search.png",
      alt: "صفحة البحث الجديدة على الديسكتوب",
      label: "بعد",
    },
  },
  {
    id: "mobile-location",
    title: "موقع المستفيد — موبايل",
    subtitle: "قبل: مودال مواقع فوق شاشة فارغة. بعد: رحلة إهداء كاملة.",
    device: "mobile",
    before: {
      src: "/assets/images/compare/before-mobile-location-modal.png",
      alt: "مودال اختيار الموقع القديم",
      label: "قبل",
    },
    after: {
      src: "/assets/images/compare/after-mobile-browse.png",
      alt: "تجربة التصفّح الجديدة",
      label: "بعد",
    },
  },
];

const JOURNEY: JourneyShot[] = [
  {
    id: "desktop-filter",
    title: "تصفية الهدايا",
    step: "بحث · ديسكتوب",
    device: "desktop",
    src: "/assets/images/compare/after-desktop-filter.png",
    alt: "مودال التصفية على الديسكتوب",
  },
  {
    id: "mobile-filter",
    title: "تصفية الهدايا",
    step: "بحث · موبايل",
    device: "mobile",
    src: "/assets/images/compare/after-mobile-filter.png",
    alt: "ورقة التصفية على الموبايل",
  },
  {
    id: "desktop-assistant",
    title: "ساعدني أختار هدية",
    step: "مساعد · ديسكتوب",
    device: "desktop",
    src: "/assets/images/compare/after-desktop-assistant.png",
    alt: "مساعد اختيار الهدية على الديسكتوب",
  },
  {
    id: "mobile-assistant",
    title: "ساعدني أختار هدية",
    step: "مساعد · موبايل",
    device: "mobile",
    src: "/assets/images/compare/after-mobile-assistant.png",
    alt: "مساعد اختيار الهدية على الموبايل",
  },
  {
    id: "desktop-personalize",
    title: "خصّص هديتك",
    step: "02 · ديسكتوب",
    device: "desktop",
    src: "/assets/images/compare/after-desktop-personalize.png",
    alt: "تخصيص الهدية على الديسكتوب",
  },
  {
    id: "mobile-personalize",
    title: "خصّص هديتك",
    step: "02 · موبايل",
    device: "mobile",
    src: "/assets/images/compare/after-mobile-personalize.png",
    alt: "تخصيص الهدية على الموبايل",
  },
  {
    id: "desktop-visit",
    title: "مكان وموعد الخدمة",
    step: "زيارة · ديسكتوب",
    device: "desktop",
    src: "/assets/images/compare/after-desktop-visit.png",
    alt: "اختيار الفرع واليوم على الديسكتوب",
  },
  {
    id: "desktop-visit-slots",
    title: "الأوقات المتاحة",
    step: "زيارة · ديسكتوب",
    device: "desktop",
    src: "/assets/images/compare/after-desktop-visit-slots.png",
    alt: "اختيار الوقت على الديسكتوب",
  },
  {
    id: "mobile-visit",
    title: "مكان وموعد الخدمة",
    step: "زيارة · موبايل",
    device: "mobile",
    src: "/assets/images/compare/after-mobile-visit.png",
    alt: "اختيار المكان والموعد على الموبايل",
  },
  {
    id: "desktop-review",
    title: "مراجعة الطلب",
    step: "03 · ديسكتوب",
    device: "desktop",
    src: "/assets/images/compare/after-desktop-review.png",
    alt: "مراجعة الطلب على الديسكتوب",
  },
  {
    id: "mobile-review",
    title: "مراجعة الطلب",
    step: "03 · موبايل",
    device: "mobile",
    src: "/assets/images/compare/after-mobile-review.png",
    alt: "مراجعة الطلب على الموبايل",
  },
  {
    id: "desktop-success",
    title: "تم الإهداء",
    step: "نجاح · ديسكتوب",
    device: "desktop",
    src: "/assets/images/compare/after-desktop-success.png",
    alt: "صفحة النجاح على الديسكتوب",
  },
  {
    id: "mobile-success",
    title: "تم الإهداء",
    step: "نجاح · موبايل",
    device: "mobile",
    src: "/assets/images/compare/after-mobile-success.png",
    alt: "صفحة النجاح على الموبايل",
  },
];

function Badge({ children, tone }: { children: string; tone: "before" | "after" }) {
  return (
    <span
      className={
        tone === "before"
          ? "rounded-full bg-[#e8e2d6] px-3 py-1 text-badge font-medium text-brand-olive"
          : "rounded-full bg-brand-olive px-3 py-1 text-badge font-medium text-white"
      }
    >
      {children}
    </span>
  );
}

function ShotCard({ shot, device }: { shot: Shot; device: Pair["device"] }) {
  const isMobile = device === "mobile";
  return (
    <figure className="flex min-w-0 flex-1 flex-col gap-3">
      <Badge tone={shot.label.startsWith("بعد") ? "after" : "before"}>{shot.label}</Badge>
      <div
        className={
          isMobile
            ? "mx-auto w-full max-w-[280px] overflow-hidden rounded-[28px] border border-border-subtle bg-bg-muted shadow-[0_18px_48px_rgba(41,41,36,0.12)] ring-1 ring-black/5"
            : "overflow-hidden rounded-2xl border border-border-subtle bg-bg-muted shadow-[0_18px_48px_rgba(41,41,36,0.1)] ring-1 ring-black/5"
        }
      >
        <CompareZoomImage
          src={shot.src}
          alt={shot.alt}
          width={isMobile ? 780 : 1440}
          height={isMobile ? 1600 : 1200}
          sizes={isMobile ? "(max-width: 768px) 70vw, 280px" : "(max-width: 1024px) 100vw, 640px"}
        />
      </div>
      <figcaption className="text-center text-caption text-text-secondary">{shot.alt}</figcaption>
    </figure>
  );
}

export function CompareGallery() {
  return (
    <>
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-caption font-medium tracking-wide text-brand-olive">
          Before / After · Full Journey
        </p>
        <h1 className="mt-3 text-display sm:text-4xl sm:leading-[1.25]">
          مقارنة إعادة تصميم صفحة الإهداء
        </h1>
        <p className="mt-3 text-body text-text-secondary sm:text-[15px] sm:leading-7">
          اضغط أي صورة للتكبير والتقريب. لقطات حية من الموقع القديم مقابل الرحلة الجديدة كاملة.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <YallahButton asChild>
            <Link href="/gifts">جرّب الرحلة الجديدة</Link>
          </YallahButton>
          <YallahButton variant="secondary" asChild>
            <Link href="/">العودة للترحيب</Link>
          </YallahButton>
        </div>
      </header>

      <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-20">
        {PAIRS.map((pair, index) => (
          <section
            key={pair.id}
            id={pair.id}
            className="scroll-mt-24 rounded-[28px] border border-border-subtle bg-bg-surface/90 p-5 shadow-[0_20px_50px_rgba(41,41,36,0.06)] backdrop-blur-sm sm:p-8"
          >
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-border-subtle pb-5">
              <div className="text-start">
                <p className="text-badge text-brand-sand">
                  {String(index + 1).padStart(2, "0")} ·{" "}
                  {pair.device === "mobile" ? "موبايل" : "ديسكتوب"}
                </p>
                <h2 className="mt-1 text-section text-text-primary">{pair.title}</h2>
                <p className="mt-1 max-w-2xl text-body-sm text-text-secondary">{pair.subtitle}</p>
              </div>
              <div className="flex items-center gap-2" aria-hidden>
                <Badge tone="before">قبل</Badge>
                <span className="text-brand-olive">←</span>
                <Badge tone="after">بعد</Badge>
              </div>
            </div>

            <div
              className={
                pair.device === "mobile"
                  ? "flex flex-col items-stretch justify-center gap-8 sm:flex-row sm:items-start sm:gap-10"
                  : "grid gap-8 lg:grid-cols-2 lg:gap-10"
              }
            >
              <ShotCard shot={pair.before} device={pair.device} />
              <ShotCard shot={pair.after} device={pair.device} />
            </div>
          </section>
        ))}
      </div>

      <section className="mt-20 scroll-mt-24" id="journey">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-badge text-brand-sand">الرحلة الجديدة كاملة</p>
          <h2 className="mt-2 text-section text-text-primary">من البحث حتى النجاح</h2>
          <p className="mt-2 text-body-sm text-text-secondary">
            فلتر، مساعد، تخصيص، زيارة، مراجعة، ونجاح — اضغط للتكبير.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {JOURNEY.map((shot) => {
            const isMobile = shot.device === "mobile";
            return (
              <figure
                key={shot.id}
                id={shot.id}
                className="rounded-[24px] border border-border-subtle bg-bg-surface/90 p-4 shadow-[0_16px_40px_rgba(41,41,36,0.06)] sm:p-5"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="text-start">
                    <p className="text-badge text-brand-sand">{shot.step}</p>
                    <h3 className="text-card-title text-text-primary">{shot.title}</h3>
                  </div>
                  <Badge tone="after">بعد</Badge>
                </div>
                <div
                  className={
                    isMobile
                      ? "mx-auto max-w-[260px] overflow-hidden rounded-[24px] border border-border-subtle bg-bg-muted ring-1 ring-black/5"
                      : "overflow-hidden rounded-xl border border-border-subtle bg-bg-muted ring-1 ring-black/5"
                  }
                >
                  <CompareZoomImage
                    src={shot.src}
                    alt={shot.alt}
                    width={isMobile ? 780 : 1440}
                    height={isMobile ? 1600 : 1200}
                    sizes={
                      isMobile
                        ? "(max-width: 768px) 70vw, 260px"
                        : "(max-width: 1024px) 100vw, 560px"
                    }
                  />
                </div>
                <figcaption className="mt-3 text-center text-caption text-text-secondary">
                  {shot.alt}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      <aside className="mt-16 rounded-[24px] border border-dashed border-brand-olive/30 bg-brand-olive/[0.04] p-6 text-center sm:p-8">
        <p className="text-card-title text-brand-olive">نفس الاختبار · نتيجة أوضح</p>
        <p className="mx-auto mt-2 max-w-xl text-body-sm text-text-secondary">
          المقارنة أيضاً في Figma — صفحة Before / After.
        </p>
        <div className="mt-5">
          <YallahButton asChild>
            <Link href="/gifts">ابدأ من صفحة الإهداء</Link>
          </YallahButton>
        </div>
      </aside>
    </>
  );
}
