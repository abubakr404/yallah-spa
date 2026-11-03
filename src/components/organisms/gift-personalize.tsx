"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/atoms/icon";
import { YallahButton } from "@/components/molecules/button";
import { Chip } from "@/components/molecules/chip";
import { TextField } from "@/components/molecules/text-field";
import { AssistantSheet } from "@/components/organisms/assistant-sheet";
import { GiftVoucherPreview } from "@/components/organisms/gift-voucher-preview";
import { SiteHeader } from "@/components/organisms/site-header";
import { Stepper } from "@/components/organisms/stepper";
import { VisitDetailsSheet } from "@/components/organisms/visit-details-sheet";
import { formatSar, cn } from "@/lib/utils";
import {
  createEmptyDraft,
  loadGiftDraft,
  saveGiftDraft,
} from "@/lib/gift-journey/storage";
import type { GiftProduct } from "@/types/gift";
import {
  CARD_THEMES,
  MESSAGE_PRESETS,
  type CardThemeId,
  type GiftDraft,
  type VisitDetails,
} from "@/types/gift-journey";

type GiftPersonalizeProps = {
  product: GiftProduct;
  catalog: GiftProduct[];
};

type FieldErrors = {
  recipientName?: string;
  senderName?: string;
  visit?: string;
};

export function GiftPersonalize({ product, catalog }: GiftPersonalizeProps) {
  const router = useRouter();
  const [draft, setDraft] = useState<GiftDraft>(() => createEmptyDraft(product.id));
  const [visitOpen, setVisitOpen] = useState(false);
  const [assistOpen, setAssistOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const stored = loadGiftDraft();
    if (stored?.giftId === product.id) {
      setDraft(stored);
      return;
    }
    const fresh = createEmptyDraft(product.id);
    saveGiftDraft(fresh);
    setDraft(fresh);
  }, [product.id]);

  const patch = (partial: Partial<GiftDraft>) => {
    setDraft((prev) => {
      const next = { ...prev, ...partial };
      saveGiftDraft(next);
      return next;
    });
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (partial.recipientName !== undefined) delete next.recipientName;
      if (partial.senderName !== undefined) delete next.senderName;
      if (partial.visit !== undefined) delete next.visit;
      return next;
    });
  };

  const placeLabel =
    draft.visit?.place === "home"
      ? "زيارة منزلية"
      : draft.visit?.place === "center"
        ? "في المركز"
        : null;

  const continueToReview = () => {
    const nextErrors: FieldErrors = {};
    if (!draft.recipientName.trim()) {
      nextErrors.recipientName = "أدخل اسم المستفيد.";
    }
    if (!draft.senderName.trim()) {
      nextErrors.senderName = "أدخل اسم المُهدي.";
    }
    if (!draft.visit) {
      nextErrors.visit = "حدّد مكان وموعد الخدمة.";
    }
    setFieldErrors(nextErrors);
    setFormError(null);
    if (Object.keys(nextErrors).length > 0) return;

    saveGiftDraft(draft);
    router.push("/gifts/review");
  };

  const switchGift = (id: string) => {
    saveGiftDraft(createEmptyDraft(id));
    router.push(`/gifts/personalize?giftId=${encodeURIComponent(id)}`);
  };

  return (
    <div className="min-h-full bg-bg-page">
      <SiteHeader variant="journey" />
      <div className="bg-bg-surface py-3">
        <Stepper step={2} />
      </div>

      <main className="mx-auto grid max-w-[1440px] gap-8 px-4 py-6 lg:grid-cols-[minmax(0,660px)_minmax(0,540px)] lg:items-start lg:gap-10 lg:px-12 lg:py-8">
        <section className="space-y-6 text-start">
          <div>
            <h1 className="text-[28px] font-bold leading-tight text-text-primary sm:text-[32px]">
              خصّص هديتك
            </h1>
            <p className="mt-2 text-body text-text-secondary">
              أضف اسم من تحب، واكتب رسالتك، واختر التصميم المناسب لهديتك.
            </p>
          </div>

          {/* Figma 94:147 — white + border; title/duration right, «تغير الهدية» left */}
          <div className="flex flex-col gap-2.5 overflow-hidden rounded-[14px] border border-border-subtle bg-bg-surface px-4 py-3.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <Icon name="clock" size={14} className="shrink-0" />
                <span className="shrink-0 text-[12px] font-medium leading-[17px] text-[#615c52]">
                  {product.durationMinutes} دقيقة
                </span>
                <span className="truncate text-[15px] font-bold leading-[21px] text-text-primary">
                  {product.title}
                </span>
              </div>
              <YallahButton
                variant="text"
                type="button"
                className="shrink-0 text-[14px] leading-5"
                onClick={() => setAssistOpen(true)}
              >
                تغير الهدية
              </YallahButton>
            </div>
            <div className="flex items-center gap-2.5">
              <p className="min-w-0 flex-1 text-[13px] leading-[18px] text-[#615c52]">
                {product.description}
              </p>
              <p className="shrink-0 text-[15px] font-bold leading-[31px] text-brand-olive">
                {formatSar(product.priceSar)}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-body font-bold text-text-primary">
              مكان وموعد الخدمة *
            </h2>
            <p className="text-caption text-text-secondary">
              مطلوب — اختر المكان والفرع والموعد الآن.
            </p>
            <button
              type="button"
              onClick={() => setVisitOpen(true)}
              className={cn(
                "flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border bg-bg-surface p-3.5 text-start transition-colors hover:bg-bg-muted/60",
                fieldErrors.visit ? "border-danger" : "border-border-subtle"
              )}
            >
              {/* RTL: action at start (right) — icon then label as Figma screenshot */}
              <span className="inline-flex shrink-0 items-center gap-2 text-[13px] font-medium leading-[18px] text-brand-olive">
                <Icon name="calendar" size={14} className="shrink-0" />
                <span>تحديد التفاصيل</span>
              </span>
              <div className="min-w-0 text-end">
                {draft.visit ? (
                  <>
                    <p className="truncate text-[13px] font-medium leading-[18px] text-text-primary">
                      {placeLabel} · {draft.visit.branchName} ·{" "}
                      {draft.visit.slotLabel}
                    </p>
                    <p className="text-[11px] leading-[15px] text-[#615c52]">
                      المكان والفرع والموعد
                    </p>
                  </>
                ) : (
                  <p className="text-[13px] leading-[18px] text-text-secondary">
                    لم يُحدد بعد — اضغط لتحديد التفاصيل
                  </p>
                )}
              </div>
            </button>
            {fieldErrors.visit ? (
              <p className="text-[12px] font-medium text-danger" role="alert">
                {fieldErrors.visit}
              </p>
            ) : null}
          </div>

          <fieldset className="space-y-3">
            <legend className="text-body font-bold text-text-primary">
              بيانات المستفيد
            </legend>
            <TextField
              label="اسم المستفيد *"
              name="recipientName"
              value={draft.recipientName}
              error={fieldErrors.recipientName}
              onChange={(e) => patch({ recipientName: e.target.value })}
              placeholder="اسم من ستصله الهدية"
            />
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-body font-bold text-text-primary">
              بيانات المُهدي
            </legend>
            <TextField
              label="اسم المُهدي *"
              name="senderName"
              value={draft.senderName}
              error={fieldErrors.senderName}
              onChange={(e) => patch({ senderName: e.target.value })}
              placeholder="اسمك كما سيظهر على البطاقة"
            />
          </fieldset>

          <div className="space-y-3">
            <h2 className="text-body font-bold text-text-primary">
              اكتب رسالة من القلب
            </h2>
            <label className="flex w-full flex-col gap-1.5 text-start">
              <span className="text-caption text-text-secondary">
                رسالة الإهداء (اختياري)
              </span>
              <textarea
                name="message"
                rows={4}
                value={draft.message}
                onChange={(e) => patch({ message: e.target.value })}
                placeholder="أتمنى لكِ لحظات مليئة بالهدوء…"
                className="w-full rounded-md border border-border-subtle bg-bg-surface px-3.5 py-3 text-start text-body text-text-primary outline-none transition-colors placeholder:text-text-secondary focus-visible:border-brand-olive-soft focus-visible:ring-2 focus-visible:ring-brand-olive-soft/25"
              />
              <span className="text-caption text-text-secondary">
                يمكنك تعديل النص · يُفضَّل حتى ≈ 120 حرفًا
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {MESSAGE_PRESETS.map((preset) => (
                <Chip
                  key={preset.id}
                  selected={draft.message === preset.text}
                  onClick={() => patch({ message: preset.text })}
                >
                  {preset.label}
                </Chip>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-body font-bold text-text-primary">
              اختر تصميم البطاقة
            </h2>
            <div className="flex flex-wrap justify-start gap-2">
              {CARD_THEMES.map((theme) => {
                const selected = draft.theme === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => patch({ theme: theme.id as CardThemeId })}
                    className="flex h-[72px] w-[110px] flex-col items-center justify-center rounded-[10px] transition-colors"
                    style={{
                      backgroundColor: theme.swatchBg,
                      color: theme.swatchText,
                      borderWidth: selected ? 2 : 1,
                      borderStyle: "solid",
                      borderColor: selected
                        ? theme.swatchBorderSelected
                        : theme.swatchBorder,
                    }}
                    aria-pressed={selected}
                  >
                    <span className="text-[11px] font-bold leading-4">
                      {theme.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {formError ? (
            <p className="text-body-sm text-danger" role="alert">
              {formError}
            </p>
          ) : null}

          {/* RTL: رجوع أولاً (يمين) ثم المتابعة (يسار / ثلثان) */}
          <div className="flex w-full items-stretch gap-2.5 pt-2">
            <YallahButton
              variant="secondary"
              asChild
              className="min-w-0 flex-1 basis-0"
            >
              <Link href="/gifts">رجوع</Link>
            </YallahButton>
            <YallahButton
              type="button"
              className="min-w-0 flex-[2] basis-0"
              onClick={continueToReview}
            >
              متابعة للمراجعة
            </YallahButton>
          </div>
        </section>

        <aside className="lg:sticky lg:top-24">
          <p className="mb-3 text-body-sm font-medium text-text-secondary">
            معاينة حية للبطاقة
          </p>
          <GiftVoucherPreview
            theme={draft.theme}
            recipientName={draft.recipientName}
            senderName={draft.senderName}
            message={draft.message}
            serviceTitle={product.title}
            durationMinutes={product.durationMinutes}
            visit={draft.visit}
          />
        </aside>
      </main>

      <VisitDetailsSheet
        open={visitOpen}
        onClose={() => setVisitOpen(false)}
        value={draft.visit}
        allowedPlaces={product.places}
        serviceTitle={product.title}
        durationMinutes={product.durationMinutes}
        onSave={(visit: VisitDetails) => patch({ visit })}
      />

      <AssistantSheet
        open={assistOpen}
        onClose={() => setAssistOpen(false)}
        products={catalog}
        onSelectGift={switchGift}
      />
    </div>
  );
}
