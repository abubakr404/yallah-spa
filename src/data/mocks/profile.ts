import type { CandidateProfile } from "@/types/gift";

/** Edit this mock to match your personal intro on the welcome page. */
export const mockCandidateProfile: CandidateProfile = {
  nameAr: "أبوبكر",
  nameEn: "Abubakr",
  role: "UX/UI & Frontend",
  summaryAr:
    "مرحباً، أنا أبوبكر — مطوّر واجهات أمامية. هذا المشروع اختبار عملي لإعادة تصميم تجربة الإهداء في يلا سبا، مبني بنمط Atomic Design مع Next.js و Tailwind و shadcn.",
  summaryEn:
    "Hi, I'm Abubakr — a frontend engineer. This interview test rebuilds Yallah Spa's gift experience with Atomic Design, Next.js, Tailwind, and shadcn.",
  stack: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Atomic Design", "RTL"],
  highlights: [
    "Design System من Figma → مكوّنات قابلة لإعادة الاستخدام",
    "طبقة API احترافية مع Mock Data جاهزة لاستبدالها بباكند حقيقي",
    "RTL أولاً مع خط Tajawal وتوكنات يلا سبا",
  ],
};
