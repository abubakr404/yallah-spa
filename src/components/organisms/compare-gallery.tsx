"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { CompareZoomImage } from "@/components/molecules/compare-zoom-image";
import { YallahButton } from "@/components/molecules";
import { Link } from "@/i18n/navigation";

type PairMessageKey =
  | "browseMobile"
  | "browseDesktop"
  | "searchMobile"
  | "searchDesktop"
  | "locationMobile";

type SingleMessageKey =
  | "filterDesktop"
  | "filterMobile"
  | "assistDesktop"
  | "assistMobile"
  | "personalizeDesktop"
  | "personalizeMobile"
  | "visitDesktop"
  | "slotsDesktop"
  | "visitMobile"
  | "reviewDesktop"
  | "reviewMobile"
  | "successDesktop"
  | "successMobile";

type Shot = {
  src: string;
  alt: string;
  label: string;
  tone: "before" | "after";
};

type PairDef = {
  id: string;
  messageKey: PairMessageKey;
  device: "mobile" | "desktop";
  before: { src: string };
  after: { src: string };
};

type JourneyShot = {
  id: string;
  messageKey: SingleMessageKey;
  device: "mobile" | "desktop";
  src: string;
};

const PAIR_DEFS: PairDef[] = [
  {
    id: "mobile-browse",
    messageKey: "browseMobile",
    device: "mobile",
    before: {
      src: "/assets/images/compare/before-mobile-gift-empty.png",
    },
    after: {
      src: "/assets/images/compare/after-mobile-browse.png",
    },
  },
  {
    id: "desktop-browse",
    messageKey: "browseDesktop",
    device: "desktop",
    before: {
      src: "/assets/images/compare/before-desktop-gift-empty.png",
    },
    after: {
      src: "/assets/images/compare/after-desktop-browse.png",
    },
  },
  {
    id: "mobile-search",
    messageKey: "searchMobile",
    device: "mobile",
    before: {
      src: "/assets/images/compare/before-mobile-search-list.png",
    },
    after: {
      src: "/assets/images/compare/after-mobile-search.png",
    },
  },
  {
    id: "desktop-search",
    messageKey: "searchDesktop",
    device: "desktop",
    before: {
      src: "/assets/images/compare/before-desktop-gift-grid.png",
    },
    after: {
      src: "/assets/images/compare/after-desktop-search.png",
    },
  },
  {
    id: "mobile-location",
    messageKey: "locationMobile",
    device: "mobile",
    before: {
      src: "/assets/images/compare/before-mobile-location-modal.png",
    },
    after: {
      src: "/assets/images/compare/after-mobile-browse.png",
    },
  },
];

const JOURNEY_DEFS: JourneyShot[] = [
  {
    id: "desktop-filter",
    messageKey: "filterDesktop",
    device: "desktop",
    src: "/assets/images/compare/after-desktop-filter.png",
  },
  {
    id: "mobile-filter",
    messageKey: "filterMobile",
    device: "mobile",
    src: "/assets/images/compare/after-mobile-filter.png",
  },
  {
    id: "desktop-assistant",
    messageKey: "assistDesktop",
    device: "desktop",
    src: "/assets/images/compare/after-desktop-assistant.png",
  },
  {
    id: "mobile-assistant",
    messageKey: "assistMobile",
    device: "mobile",
    src: "/assets/images/compare/after-mobile-assistant.png",
  },
  {
    id: "desktop-personalize",
    messageKey: "personalizeDesktop",
    device: "desktop",
    src: "/assets/images/compare/after-desktop-personalize.png",
  },
  {
    id: "mobile-personalize",
    messageKey: "personalizeMobile",
    device: "mobile",
    src: "/assets/images/compare/after-mobile-personalize.png",
  },
  {
    id: "desktop-visit",
    messageKey: "visitDesktop",
    device: "desktop",
    src: "/assets/images/compare/after-desktop-visit.png",
  },
  {
    id: "desktop-visit-slots",
    messageKey: "slotsDesktop",
    device: "desktop",
    src: "/assets/images/compare/after-desktop-visit-slots.png",
  },
  {
    id: "mobile-visit",
    messageKey: "visitMobile",
    device: "mobile",
    src: "/assets/images/compare/after-mobile-visit.png",
  },
  {
    id: "desktop-review",
    messageKey: "reviewDesktop",
    device: "desktop",
    src: "/assets/images/compare/after-desktop-review.png",
  },
  {
    id: "mobile-review",
    messageKey: "reviewMobile",
    device: "mobile",
    src: "/assets/images/compare/after-mobile-review.png",
  },
  {
    id: "desktop-success",
    messageKey: "successDesktop",
    device: "desktop",
    src: "/assets/images/compare/after-desktop-success.png",
  },
  {
    id: "mobile-success",
    messageKey: "successMobile",
    device: "mobile",
    src: "/assets/images/compare/after-mobile-success.png",
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

function ShotCard({ shot, device }: { shot: Shot; device: PairDef["device"] }) {
  const isMobile = device === "mobile";
  return (
    <figure className="flex min-w-0 flex-1 flex-col gap-3">
      <Badge tone={shot.tone}>{shot.label}</Badge>
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
  const t = useTranslations("Compare");

  const beforeLabel = t("before");
  const afterLabel = t("after");

  const pairs = useMemo(
    () =>
      PAIR_DEFS.map((def) => ({
        ...def,
        title: t(`pairs.${def.messageKey}.title`),
        subtitle: t(`pairs.${def.messageKey}.subtitle`),
        before: {
          src: def.before.src,
          alt: t(`pairs.${def.messageKey}.beforeAlt`),
          label: beforeLabel,
          tone: "before" as const,
        },
        after: {
          src: def.after.src,
          alt: t(`pairs.${def.messageKey}.afterAlt`),
          label: afterLabel,
          tone: "after" as const,
        },
      })),
    [t, beforeLabel, afterLabel]
  );

  const journey = useMemo(
    () =>
      JOURNEY_DEFS.map((def) => ({
        ...def,
        title: t(`singles.${def.messageKey}.title`),
        step: t(`singles.${def.messageKey}.step`),
        alt: t(`singles.${def.messageKey}.alt`),
      })),
    [t]
  );

  return (
    <>
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-caption font-medium tracking-wide text-brand-olive">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 text-display sm:text-4xl sm:leading-[1.25]">{t("pageTitle")}</h1>
        <p className="mt-3 text-body text-text-secondary sm:text-[15px] sm:leading-7">
          {t("pageSubtitle")}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <YallahButton asChild>
            <Link href="/gifts">{t("tryJourney")}</Link>
          </YallahButton>
          <YallahButton variant="secondary" asChild>
            <Link href="/">{t("backWelcome")}</Link>
          </YallahButton>
        </div>
      </header>

      <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-20">
        {pairs.map((pair, index) => (
          <section
            key={pair.id}
            id={pair.id}
            className="scroll-mt-24 rounded-[28px] border border-border-subtle bg-bg-surface/90 p-5 shadow-[0_20px_50px_rgba(41,41,36,0.06)] backdrop-blur-sm sm:p-8"
          >
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-border-subtle pb-5">
              <div className="text-start">
                <p className="text-badge text-brand-sand">
                  {String(index + 1).padStart(2, "0")} ·{" "}
                  {pair.device === "mobile" ? t("mobile") : t("desktop")}
                </p>
                <h2 className="mt-1 text-section text-text-primary">{pair.title}</h2>
                <p className="mt-1 max-w-2xl text-body-sm text-text-secondary">{pair.subtitle}</p>
              </div>
              <div className="flex items-center gap-2" aria-hidden>
                <Badge tone="before">{beforeLabel}</Badge>
                <span className="text-brand-olive">←</span>
                <Badge tone="after">{afterLabel}</Badge>
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
          <p className="text-badge text-brand-sand">{t("journeyEyebrow")}</p>
          <h2 className="mt-2 text-section text-text-primary">{t("journeyTitle")}</h2>
          <p className="mt-2 text-body-sm text-text-secondary">{t("journeySubtitle")}</p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {journey.map((shot) => {
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
                  <Badge tone="after">{afterLabel}</Badge>
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
        <p className="text-card-title text-brand-olive">{t("asideTitle")}</p>
        <p className="mx-auto mt-2 max-w-xl text-body-sm text-text-secondary">{t("asideBody")}</p>
        <div className="mt-5">
          <YallahButton asChild>
            <Link href="/gifts">{t("startGifts")}</Link>
          </YallahButton>
        </div>
      </aside>
    </>
  );
}
