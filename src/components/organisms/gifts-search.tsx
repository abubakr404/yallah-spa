"use client";

import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState, type ComponentProps } from "react";
import { Icon } from "@/components/atoms/icon";
import { Chip } from "@/components/molecules/chip";
import { TextField } from "@/components/molecules/text-field";
import { YallahButton } from "@/components/molecules/button";
import { FilterSheet, type FilterState } from "@/components/organisms/filter-sheet";
import { GiftProductCard } from "@/components/organisms/gift-product-card";
import { SiteHeader } from "@/components/organisms/site-header";
import { useLocalizedProducts } from "@/hooks/use-localized-products";
import { useRouter } from "@/i18n/navigation";
import { createEmptyDraft, saveGiftDraft } from "@/lib/gift-journey/storage";
import { cn } from "@/lib/utils";
import type { GiftBadge, GiftProduct } from "@/types/gift";

const PAGE_SIZE = 9;

type GiftsSearchProps = {
  products: GiftProduct[];
  initialType?: string;
};

function normalizeType(value: string): GiftBadge | "" {
  if (value === "package" || value === "باقة") return "package";
  if (value === "session" || value === "جلسة") return "session";
  return "";
}

export function GiftsSearch({ products, initialType = "" }: GiftsSearchProps) {
  const router = useRouter();
  const t = useTranslations("GiftsSearch");
  const tCommon = useTranslations("Common");
  const localized = useLocalizedProducts(products);
  const [q, setQ] = useState("");
  const [type, setType] = useState(normalizeType(initialType));
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState | null>(null);
  const [page, setPage] = useState(1);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return localized.filter((p) => {
      const badgeFilter =
        filters?.giftType === "packages"
          ? "package"
          : filters?.giftType === "sessions"
            ? "session"
            : type;
      if (badgeFilter && p.badge !== badgeFilter) return false;
      if (filters?.place === "center" && !p.places.includes("center"))
        return false;
      if (filters?.place === "home" && !p.places.includes("home")) return false;
      if (filters?.budget === "lte300" && p.priceSar > 300) return false;
      if (
        filters?.budget === "300-500" &&
        (p.priceSar < 300 || p.priceSar > 500)
      )
        return false;
      if (filters?.budget === "gt500" && p.priceSar <= 500) return false;
      if (!query) return true;
      return (
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    });
  }, [localized, q, type, filters]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [q, type, filters]);

  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const start = results.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, results.length);
  const pageItems = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-full bg-bg-page">
      <SiteHeader />
      <main className="mx-auto max-w-[1100px] px-4 py-8 text-start sm:px-6">
        <h1 className="text-section text-text-primary">{t("title")}</h1>
        <p className="mt-1 text-body-sm text-text-secondary">{t("subtitle")}</p>

        <div className="mt-5 flex items-end gap-2">
          <div className="min-w-0 flex-1">
            <TextField
              label={t("queryLabel")}
              name="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("queryPlaceholder")}
            />
          </div>
          <YallahButton
            type="button"
            variant="secondary"
            className="mb-0 h-12 shrink-0 gap-1.5 px-4"
            onClick={() => setFilterOpen(true)}
          >
            {t("filterCta")}
            <Icon name="filter" size={16} />
          </YallahButton>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {[
            { value: "" as const, label: tCommon("all") },
            { value: "package" as const, label: t("packages") },
            { value: "session" as const, label: t("sessions") },
          ].map((opt) => (
            <Chip
              key={opt.label}
              selected={type === opt.value}
              onClick={() => {
                setType(opt.value);
                setFilters(null);
              }}
            >
              {opt.label}
            </Chip>
          ))}
        </div>

        <div className="mt-8 flex items-baseline justify-between gap-3">
          <h2 className="text-[15px] font-bold leading-[19px] text-text-primary">
            {t("resultsTitle")}
          </h2>
          <p className="text-[12px] leading-4 text-text-secondary">
            {results.length === 0
              ? t("noResults")
              : t("showing", { start, end, total: results.length })}
          </p>
        </div>

        <div className="mt-4 grid justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((product) => (
            <GiftProductCard
              key={product.id}
              product={product}
              onGift={(id) => {
                saveGiftDraft(createEmptyDraft(id));
                router.push(
                  `/gifts/personalize?giftId=${encodeURIComponent(id)}`
                );
              }}
            />
          ))}
        </div>

        {results.length === 0 ? (
          <p className="mt-10 text-center text-body text-text-secondary">
            {t("noResultsBody")}
          </p>
        ) : null}

        {results.length > PAGE_SIZE ? (
          <nav
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
            aria-label={t("paginationAria")}
          >
            <PaginationBtn
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="gap-1 px-2.5 sm:px-3"
              aria-label={tCommon("previous")}
            >
              <Icon name="chevron-right" size={16} />
              <span className="hidden sm:inline">{tCommon("previous")}</span>
            </PaginationBtn>

            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <PaginationBtn
                key={n}
                active={n === page}
                onClick={() => setPage(n)}
                className="size-10 px-0"
                aria-label={t("pageAria", { n })}
                aria-current={n === page ? "page" : undefined}
              >
                {n}
              </PaginationBtn>
            ))}

            <PaginationBtn
              disabled={page >= pageCount}
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              className="gap-1 px-2.5 sm:px-3"
              aria-label={tCommon("next")}
            >
              <span className="hidden sm:inline">{tCommon("next")}</span>
              <Icon name="chevron-left" size={16} />
            </PaginationBtn>
          </nav>
        ) : null}
      </main>

      <FilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={(next) => {
          setFilters(next);
          setType("");
          setFilterOpen(false);
        }}
      />
    </div>
  );
}

function PaginationBtn({
  children,
  className,
  active,
  disabled,
  onClick,
  ...props
}: ComponentProps<"button"> & { active?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-full text-[13px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-olive-soft/40 disabled:pointer-events-none disabled:opacity-40",
        active
          ? "bg-brand-olive text-text-inverse"
          : "border border-border-subtle bg-bg-surface text-text-primary hover:bg-bg-muted",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
