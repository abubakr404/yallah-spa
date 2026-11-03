# Yallah Spa — Gift Page Redesign (Interview Test)

Practical Test: **UX/UI & Front-End Developer**  
Redesign + implement the Gift Page for [Yallah Spa](https://yallaspa-client-side.netlify.app/gifts) — Arabic RTL, desktop + mobile, mock data only.

## Deliverables

| Item | Link / location |
|---|---|
| **Figma** | [Yallah Spa — Gift Page Redesign](https://www.figma.com/design/L4awvfGrnlcQqGOorNEYkw/Yallah-Spa-%E2%80%94-Gift-Page-Redesign) · page **Before / After** for old vs new |
| **Live demo** | Host on Vercel / Netlify after deploy |
| **Before / After (web)** | `/compare` — old live screenshots vs redesigned UI |
| **This repo** | Run locally with the scripts below |

## Stack

- **pnpm** · **Next.js** App Router · **React** · **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (RTL)
- **Atomic Design**: `atoms` → `molecules` → `organisms`
- **Mock API**: fetch-shaped clients over mock data (no backend)

## Run

```bash
pnpm install
pnpm dev
pnpm build
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

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
3. **Packages vs sessions** — Explicit toggle; cards show price, duration, and clear CTAs.
4. **RTL & Arabic** — `dir="rtl"`, Tajawal, mirrored controls (pagination, carousel, sheets).
5. **Desktop + mobile** — Shared components; sheets are dialogs on desktop and bottom sheets on mobile.
6. **Mock API layer** — UI calls `fetchGifts()` etc.; flip `USE_MOCK` when a backend exists.
7. **Figma** — Components + Auto Layout; Design System page synced with code atoms/molecules/organisms.

## Project layout

```
src/components/atoms|molecules|organisms
src/lib/api/          → mock-ready clients
src/data/mocks/       → gift, branch, profile payloads
src/app/gifts/        → journey pages
public/assets/images/compare/  → before/after screenshots
```

Edit `src/data/mocks/profile.ts` for welcome name / role / highlights.
