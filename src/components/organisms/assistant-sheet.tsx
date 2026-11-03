"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { YallahButton } from "@/components/molecules/button";
import { Chip } from "@/components/molecules/chip";
import { Sheet } from "@/components/organisms/sheet";
import { formatSar } from "@/lib/utils";
import type { GiftProduct } from "@/types/gift";

type AssistantSheetProps = {
  open: boolean;
  onClose: () => void;
  products: GiftProduct[];
  onSelectGift?: (id: string) => void;
};

export type AssistantPrefs = {
  recipient: string;
  occasion: string;
  budget: string;
};

/**
 * Figma «ورقة-مساعد-هدايا» — questions + 3 suggestions in the same sheet.
 */
export function AssistantSheet({
  open,
  onClose,
  products,
  onSelectGift,
}: AssistantSheetProps) {
  const [recipient, setRecipient] = useState("friend-f");
  const [occasion, setOccasion] = useState("congrats");
  const [budget, setBudget] = useState("lte300");
  const [seed, setSeed] = useState(0);

  const suggestions = useMemo(() => {
    let list = [...products];
    if (budget === "lte300") list = list.filter((p) => p.priceSar < 300);
    if (budget === "300-500")
      list = list.filter((p) => p.priceSar >= 300 && p.priceSar <= 500);
    if (budget === "gt500") list = list.filter((p) => p.priceSar > 500);
    if (recipient === "couple") list = list.filter((p) => p.serviceCount >= 2);
    if (list.length < 3) list = [...products];
    const rotated = [...list.slice(seed % list.length), ...list.slice(0, seed % list.length)];
    return rotated.slice(0, 3);
  }, [products, budget, recipient, seed]);

  return (
    <Sheet
      open={open}
      title="ساعدك أختار هدية"
      onClose={onClose}
      placement="responsive"
      size="sm"
      className="md:max-w-[390px]"
      footer={
        <div className="flex flex-col gap-2">
          <YallahButton fullWidth type="button" onClick={() => setSeed((s) => s + 1)}>
            تحديث الاقتراحات
          </YallahButton>
          <YallahButton fullWidth variant="secondary" type="button" onClick={onClose}>
            إغلاق
          </YallahButton>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <p className="text-[12px] text-[#6b6659]">
          أجب عن 3 أسئلة سريعة وسنقترح أفضل 3 هدايا.
        </p>

        <Field label="لمن الهدية؟">
          <ChipRow
            value={recipient}
            onChange={setRecipient}
            options={[
              { value: "friend-m", label: "صديق" },
              { value: "friend-f", label: "صديقة" },
              { value: "man", label: "رجل" },
              { value: "couple", label: "زوجين" },
            ]}
          />
        </Field>

        <Field label="ما المناسبة؟">
          <ChipRow
            value={occasion}
            onChange={setOccasion}
            options={[
              { value: "congrats", label: "تهنئة" },
              { value: "none", label: "بدون مناسبة" },
              { value: "thanks", label: "شكر" },
              { value: "wedding", label: "زواج" },
            ]}
          />
        </Field>

        <Field label="الميزانية؟">
          <ChipRow
            value={budget}
            onChange={setBudget}
            options={[
              { value: "lte300", label: "أقل من 300" },
              { value: "300-500", label: "300–500" },
              { value: "gt500", label: "أكثر من 500" },
            ]}
          />
        </Field>

        <p className="text-[13px] font-bold text-brand-olive">
          اقتراحاتنا لك ({suggestions.length} هدايا)
        </p>

        <div className="flex flex-col gap-2">
          {suggestions.map((product) => (
            <article
              key={product.id}
              className="flex h-[77px] items-center gap-2.5 rounded-xl border border-[#dbd6c7] bg-bg-surface px-2.5 py-2"
            >
              <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={product.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="min-w-0 flex-1 text-start">
                <p className="truncate text-[12px] font-bold text-[#2e2e26]">
                  {product.title}
                </p>
                <p className="text-[11px] font-medium text-brand-olive">
                  {formatSar(product.priceSar)}
                </p>
              </div>
              <YallahButton
                type="button"
                className="h-11 shrink-0 px-4 py-0 text-[13px]"
                onClick={() => {
                  onSelectGift?.(product.id);
                  onClose();
                }}
              >
                أهدِ هذه
              </YallahButton>
            </article>
          ))}
        </div>
      </div>
    </Sheet>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[12px] font-bold text-[#2e2e26]">{label}</p>
      {children}
    </div>
  );
}

function ChipRow({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap justify-start gap-2">
      {options.map((opt) => (
        <Chip
          key={opt.value}
          selected={value === opt.value}
          onClick={() => onChange(opt.value)}
          className="px-3 py-[7px] text-[11px]"
        >
          {opt.label}
        </Chip>
      ))}
    </div>
  );
}
