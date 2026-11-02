import Link from "next/link";
import { Logo } from "@/components/atoms";
import { YallahButton } from "@/components/molecules";
import { SiteHeader, Stepper } from "@/components/organisms";
import { fetchCandidateProfile } from "@/lib/api";

export default async function WelcomePage() {
  const { data: profile } = await fetchCandidateProfile();

  return (
    <div className="relative min-h-full overflow-hidden bg-bg-page">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(199,173,133,0.28),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(75,77,58,0.12),_transparent_50%)]"
      />
      <SiteHeader />

      <main className="relative mx-auto flex max-w-6xl flex-col px-4 pb-16 pt-10 text-start sm:px-6 sm:pt-16 lg:pt-20">
        {/* In RTL grid, column 1 is on the inline-start (right) */}
        <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div className="order-2 lg:order-1">
            <p className="text-caption font-medium tracking-wide text-brand-olive">
              Interview Test · Yallah Spa Gift Redesign
            </p>
            <h1 className="mt-3 text-display sm:text-4xl sm:leading-[1.25]">
              أهلاً — أنا {profile.nameAr}
            </h1>
            <p className="mt-2 text-section text-brand-olive-soft">
              {profile.role}
            </p>
            <p className="mt-4 max-w-xl me-auto text-body text-text-secondary sm:text-[15px] sm:leading-7">
              {profile.summaryAr}
            </p>

            <ul className="mt-6 space-y-2.5">
              {profile.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-body-sm text-text-primary"
                >
                  <span
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-sand"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-start gap-3">
              <YallahButton asChild>
                <Link href="/gifts">ابدأ رحلة الإهداء</Link>
              </YallahButton>
              <YallahButton variant="secondary" asChild>
                <Link href="/design-system">نظام التصميم</Link>
              </YallahButton>
            </div>

            <div className="mt-8 flex flex-wrap justify-start gap-2">
              {profile.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-bg-muted px-3 py-1.5 text-badge text-brand-olive"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <aside className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-[24px] border border-border-subtle bg-bg-surface p-6 shadow-[0_24px_60px_rgba(41,41,36,0.08)] sm:p-8">
              <div className="flex flex-col items-center gap-6 text-center">
                <Logo href={null} className="h-16" />
                <div>
                  <p className="text-card-title">إعادة تصميم صفحة الإهداء</p>
                  <p className="mt-1 text-caption">
                    الخيار أ · فرع اختياري · رحلة 3 خطوات · Desktop + Mobile · RTL
                  </p>
                </div>
                <Stepper step={1} className="w-full" />
                <div className="w-full rounded-2xl bg-bg-muted/80 p-4 text-start">
                  <p className="text-badge text-text-secondary">جاهز للتجربة</p>
                  <p className="mt-1 text-body">
                    اختار → خصّص → راجع سلتك — رحلة الإهداء متصلة بنظام التصميم وطبقة Mock API.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <p className="mt-12 text-center text-caption">
          {profile.nameEn} · Frontend · Mock API layer ready for a real backend
        </p>
      </main>
    </div>
  );
}
