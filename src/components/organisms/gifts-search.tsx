"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/atoms/icon";
import { Chip } from "@/components/molecules/chip";
import { TextField } from "@/components/molecules/text-field";
import { YallahButton } from "@/components/molecules/button";
import { FilterSheet, type FilterState } from "@/components/organisms/filter-sheet";
import { GiftProductCard } from "@/components/organisms/gift-product-card";
import { SiteHeader } from "@/components/organisms/site-header";
import { createEmptyDraft, saveGiftDraft } from "@/lib/gift-journey/storage";
import type { GiftProduct } from "@/types/gift";

type GiftsSearchProps = {
  products: GiftProduct[];
  initialType?: string;
};

export function GiftsSearch({ products, initialType = "" }: GiftsSearchProps) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [type, setType] = useState(initialType);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState | null>(null);

  const results = useMemo(() => {
    const query = q.trim();
    return products.filter((p) => {
      const badgeFilter = filters?.giftType === "packages"
        ? "باقة"
        : filters?.giftType === "sessions"
          ? "جلسة"
          : type;
      if (badgeFilter && p.badge !== badgeFilter) return false;
      if (filters?.place === "center" && !p.places.includes("center")) return false;
      if (filters?.place === "home" && !p.places.includes("home")) return false;
      if (filters?.budget === "lte300" && p.priceSar > 300) return false;
      if (
        filters?.budget === "300-500" &&
        (p.priceSar < 300 || p.priceSar > 500)
      )
        return false;
      if (filters?.budget === "gt500" && p.priceSar <= 500) return false;
      if (!query) return true;
      return p.title.includes(query) || p.description.includes(query);
    });
  }, [products, q, type, filters]);

  return (
    <div className="min-h-full bg-bg-page">
      <SiteHeader />
      <main className="mx-auto max-w-[1100px] px-4 py-8 text-start sm:px-6">
        <h1 className="text-section text-text-primary">ابحث عن هدايا</h1>
        <p className="mt-1 text-body-sm text-text-secondary">
          ابحث بالاسم أو الوصف، ثم ابدأ التخصيص.
        </p>

        <div className="mt-5 flex items-end gap-2">
          <div className="min-w-0 flex-1">
            <TextField
              label="كلمة البحث"
              name="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="مثال: مساج، عناية، باقة…"
            />
          </div>
          <YallahButton
            type="button"
            variant="secondary"
            className="mb-0 h-12 shrink-0 gap-1.5 px-4"
            onClick={() => setFilterOpen(true)}
          >
            <Icon name="filter" size={14} />
            تصفية
          </YallahButton>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {[
            { value: "", label: "الكل" },
            { value: "باقة", label: "باقات" },
            { value: "جلسة", label: "جلسات" },
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

        <div className="mt-8 grid justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
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
            لا نتائج لهذا البحث.
          </p>
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
