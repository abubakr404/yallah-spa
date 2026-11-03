# Yallah Spa — Gift Page Redesign (Interview Test)

Practical Test: **UX/UI & Front-End Developer**  
Candidate: **Abubakr**  
Redesign + implement the Gift Page for [Yallah Spa](https://yallaspa-client-side.netlify.app/gifts) — Arabic RTL, desktop + mobile, mock data only.

> Interview submission for evaluation only. Design and code remain the author’s work unless a formal agreement says otherwise.

## Deliverables

| Item | Link |
|---|---|
| **Figma** | [Yallah Spa — Gift Page Redesign](https://www.figma.com/design/L4awvfGrnlcQqGOorNEYkw/Yallah-Spa-%E2%80%94-Gift-Page-Redesign) |
| **GitHub** | [github.com/abubakr404/yallah-spa](https://github.com/abubakr404/yallah-spa) |
| **Live demo** | [yallah-spa-1gai.vercel.app](https://yallah-spa-1gai.vercel.app/) |
| **Before / After (web)** | [/compare](https://yallah-spa-1gai.vercel.app/compare) — old live screenshots vs redesigned UI |

## Stack

- **pnpm** · **Next.js** App Router · **React** · **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (RTL)
- **Atomic Design**: `atoms` → `molecules` → `organisms`
- **Mock API**: fetch-shaped clients over mock data (no backend)
- **i18n-ready**: `next-intl` · Arabic primary · copy in `messages/ar.json` (& `en.json` prepared)

## Run

```bash
pnpm install
pnpm dev
pnpm build
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

Arabic is the default locale (no URL prefix).

| Route | Purpose |
|---|---|
| `/` | Welcome / intro |
| `/compare` | Before / After showcase (old site vs redesign) |
| `/design-system` | Foundations + components showcase |
| `/gifts` | Browse — packages / sessions carousel |
| `/gifts/search` | Search, filter, paginated results |
| `/gifts/personalize` | Sender / recipient, message, card, date |
| `/gifts/review` | Review before complete |
| `/gifts/success` | Confirmation |

Login, payment, and real WhatsApp delivery are **out of scope** per the brief.

## Main decisions

1. **Journey first** — Choose → Personalize → Review (stepper), instead of a single cluttered page.
2. **Branch / location early** — Recipient location unlocks relevant packages & sessions.
3. **Packages vs sessions** — Explicit sections/filters; cards show price, duration, and clear CTAs.
4. **RTL & Arabic first** — `dir="rtl"`, Tajawal, mirrored controls (pagination, carousel, sheets).
5. **Desktop + mobile** — Shared components; sheets are dialogs on desktop and bottom sheets on mobile.
6. **Mock API layer** — UI calls `fetchGifts()` etc.; flip `USE_MOCK` when a backend exists.
7. **Figma** — Components + Auto Layout; Design System page synced with code atoms/molecules/organisms.
8. **Before / After** — Side-by-side comparison of the live old experience vs the redesign (web + Figma).

## Project layout

```
messages/ar.json|en.json   → UI + catalog copy (Arabic primary)
src/i18n/                  → routing, request config, navigation helpers
src/app/[locale]/          → locale-aware pages
src/components/atoms|molecules|organisms
src/lib/api/               → mock-ready clients
src/data/mocks/            → gift, branch, profile payloads
public/assets/images/compare/  → before/after screenshots
```

Edit `src/data/mocks/profile.ts` for welcome name / role / highlights.
