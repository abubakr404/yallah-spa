import {
  Divider,
  Icon,
  Indicator,
  IndicatorGroup,
  Logo,
  Tag,
  type IconName,
} from "@/components/atoms";
import {
  DsAppointmentPickerDemo,
  DsCarouselDemo,
  DsFilterSheetDemo,
  DsFormControlsDemo,
  DsStepperDemo,
  DsVisitSheetDemo,
} from "@/components/design-system/ds-interactive";
import { DsBlock, DsSection } from "@/components/design-system/ds-section";
import {
  ActionTile,
  IconButton,
  MetaRow,
  TextField,
  YallahButton,
} from "@/components/molecules";
import {
  GiftProductCard,
  SiteHeader,
  SuggestionCard,
} from "@/components/organisms";
import { fetchGifts } from "@/lib/api";

export const metadata = {
  title: "نظام التصميم · Yallah Spa",
  description: "Design System — Atomic components for Yallah Spa gift experience",
};

const COLORS = [
  { name: "زيتوني", token: "brand/olive", className: "bg-brand-olive" },
  { name: "زيتوني ناعم", token: "brand/olive-soft", className: "bg-brand-olive-soft" },
  { name: "رملي", token: "brand/sand", className: "bg-brand-sand" },
  { name: "حلقة رملية", token: "brand/sand-ring", className: "bg-brand-sand-ring" },
  { name: "صفحة", token: "bg/page", className: "bg-bg-page border border-border-subtle" },
  { name: "سطح", token: "bg/surface", className: "bg-bg-surface border border-border-subtle" },
  { name: "مكتوم", token: "bg/muted", className: "bg-bg-muted" },
  { name: "عاجي", token: "bg/ivory", className: "bg-bg-ivory border border-border-soft" },
  { name: "نص أساسي", token: "text/primary", className: "bg-text-primary" },
  { name: "نص ثانوي", token: "text/secondary", className: "bg-text-secondary" },
  { name: "حد خفيف", token: "border/subtle", className: "bg-border-subtle" },
  { name: "حد ناعم", token: "border/soft", className: "bg-border-soft" },
  { name: "تاج مركز", token: "tag/center", className: "bg-tag-center" },
  { name: "تاج منزل", token: "tag/home", className: "bg-tag-home" },
  { name: "نجاح", token: "success", className: "bg-success" },
  { name: "خطر", token: "danger", className: "bg-danger" },
] as const;

const RADII = [
  { name: "sm", value: "8", className: "rounded-sm" },
  { name: "md", value: "12", className: "rounded-md" },
  { name: "lg", value: "16", className: "rounded-lg" },
  { name: "xl", value: "24", className: "rounded-xl" },
  { name: "sheet", value: "20", className: "rounded-[20px]" },
  { name: "pill", value: "999", className: "rounded-full" },
] as const;

const ICONS: IconName[] = [
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "chevron-down",
  "clock",
  "location",
  "calendar",
  "services",
  "menu",
  "download",
  "copy",
  "share",
  "check",
  "close",
  "gift",
  "qr",
  "filter",
  "sparkles",
  "whatsapp",
];

export default async function DesignSystemPage() {
  const { data: gifts } = await fetchGifts({ availableOnly: true });
  const sample = gifts[0];

  return (
    <div className="min-h-full bg-bg-page">
      <SiteHeader />
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-start sm:gap-8 sm:px-6 sm:py-10">
        <header>
          <p className="text-caption font-medium text-brand-olive">
            Yallah Spa · Design System (Atomic) · Fidelity pass
          </p>
          <h1 className="mt-2 text-display">دليل المطوّر</h1>
          <p className="mt-2 max-w-2xl me-auto text-body text-text-secondary">
            مكوّنات مطابقة لـ Figma: ألوان، زوايا، عناصر تحكم مخصصة، شريط خطوات،
            كاروسيل، وورقة تصفية — جاهزة لصفحات الإهداء.
          </p>
        </header>

        <DsSection
          title="الأسس"
          description="رموز الألوان والزوايا — مربوطة بآخر قيم Figma"
        >
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="mb-3.5 text-section">الألوان</h3>
              <div className="flex flex-wrap justify-start gap-3">
                {COLORS.map((c) => (
                  <div
                    key={c.token}
                    className="flex w-[72px] flex-col items-start gap-2"
                  >
                    <div className={`h-12 w-full rounded-sm ${c.className}`} />
                    <span className="text-badge text-text-primary">{c.name}</span>
                    <span className="w-full break-words text-start text-caption">
                      {c.token}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3.5 text-section">الزوايا</h3>
              <div className="flex flex-wrap justify-start gap-4">
                {RADII.map((r) => (
                  <div key={r.name} className="flex flex-col items-center gap-2">
                    <div
                      className={`size-16 border-[1.5px] border-brand-olive bg-bg-muted ${r.className}`}
                    />
                    <span className="text-badge">{r.name}</span>
                    <span className="text-caption">{r.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-caption">
                Navbar = بدون radius. الحقول = lg 16. البطاقات = lg 16. الأوراق =
                أعلى 20. الأزرار/الرقاقات = pill.
              </p>
            </div>
          </div>
        </DsSection>

        <DsSection title="ذرات" description="أيقونات، وسوم، مؤشرات، شعار">
          <div className="flex flex-col gap-7">
            <DsBlock label="أيقونات">
              {ICONS.map((name) => (
                <span
                  key={name}
                  className="inline-flex size-8 items-center justify-center rounded-md bg-bg-muted text-text-primary"
                  title={name}
                >
                  <Icon name={name} />
                </span>
              ))}
            </DsBlock>
            <DsBlock label="وسوم وشارات">
              <Tag variant="center">في المركز</Tag>
              <Tag variant="home">زيارة منزلية</Tag>
              <Tag variant="package">باقة</Tag>
            </DsBlock>
            <DsBlock label="مؤشرات كاروسيل">
              <IndicatorGroup count={4} activeIndex={0} />
              <Indicator active />
              <Indicator />
              <Divider className="w-40" />
            </DsBlock>
            <DsBlock label="شعار">
              <Logo href={null} />
            </DsBlock>
          </div>
        </DsSection>

        <DsSection
          title="جزيئات"
          description="أزرار + عناصر تحكم مخصصة مطابقة لـ Figma (ليست shadcn الافتراضي)"
        >
          <div className="flex flex-col gap-7">
            <DsBlock label="أزرار">
              <YallahButton variant="primary">أهدِ هذه الباقة</YallahButton>
              <YallahButton variant="secondary">أهدِ هذه الباقة</YallahButton>
              <YallahButton variant="ghost">أهدِ هذه الباقة</YallahButton>
              <YallahButton variant="text" className="gap-1">
                <span className="hidden sm:inline">عرض الكل</span>
                <Icon name="chevron-left" size={16} />
              </YallahButton>
              <YallahButton variant="secondary" className="gap-1.5">
                التصفية
                <Icon name="filter" size={16} />
              </YallahButton>
              <IconButton variant="close" label="إغلاق" />
              <IconButton variant="remove" label="حذف" />
            </DsBlock>
            <DsBlock label="إجراءات">
              <ActionTile icon="share" label="مشاركة الرابط" />
              <ActionTile icon="copy" label="نسخ الرابط" />
              <ActionTile icon="download" label="تحميل البطاقة" />
            </DsBlock>
            <DsBlock label="حقل نص">
              <TextField
                defaultValue="سارة أحمد"
                className="w-full max-w-xs rounded-md"
                aria-label="اسم"
              />
            </DsBlock>
            <DsFormControlsDemo />
            <DsBlock label="صفوف معلومات">
              <div className="flex flex-col items-start gap-2">
                <MetaRow icon="clock" label="60 دقيقة" />
                <MetaRow icon="location" label="متوفرة في 3 فروع" />
                <MetaRow icon="calendar" label="الثلاثاء 3 نوفمبر" />
              </div>
            </DsBlock>
          </div>
        </DsSection>

        <DsSection
          id="organisms"
          title="كائنات"
          description="ترويسات بلا radius · شريط خطوات Figma · بطاقات · كاروسيل · ورقة"
        >
          <div className="flex flex-col gap-8">
            <DsBlock label="ترويسات (بدون border-radius)">
              <div className="w-full space-y-4">
                <div className="overflow-hidden border border-border-subtle">
                  <SiteHeader variant="desktop" className="static" />
                </div>
                <div className="me-auto max-w-sm overflow-hidden border border-border-subtle">
                  <SiteHeader variant="mobile" className="static" />
                </div>
              </div>
            </DsBlock>

            <DsBlock label="شريط خطوات — اختار / خصص / راجع سلتك">
              <DsStepperDemo />
            </DsBlock>

            <DsBlock label="بطاقات">
              {sample ? (
                <>
                  <GiftProductCard product={sample} />
                  <SuggestionCard product={sample} />
                </>
              ) : null}
            </DsBlock>

            <DsBlock label="كاروسيل + ترقيم + زر التالي">
              <DsCarouselDemo
                imageUrl={sample?.imageUrl ?? "/assets/images/gift-card-spa.jpg"}
              />
            </DsBlock>

            <DsBlock label="ورقة تصفية (Modal / Sheet)">
              <DsFilterSheetDemo />
            </DsBlock>

            <DsBlock label="اختيار موعد (تقويم + أوقات)">
              <DsAppointmentPickerDemo />
            </DsBlock>

            <DsBlock label="ورقة مكان وموعد الخدمة">
              <DsVisitSheetDemo />
            </DsBlock>
          </div>
        </DsSection>
      </main>
    </div>
  );
}
