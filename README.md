# Yallah Spa — Gift Page Redesign

Arabic-first **UX/UI + Front-End** redesign of the [Yallah Spa](https://yallaspa-client-side.netlify.app/gifts) gift experience: choose a package/session → personalize the card → review → share.

Built as a practical interview test for a **UX/UI & Front-End Developer** role — focused on journey clarity, RTL polish, and clean Atomic Design implementation.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=flat-square)](https://yallah-spa-1gai.vercel.app/)
[![Figma](https://img.shields.io/badge/Figma-Design-orange?style=flat-square)](https://www.figma.com/design/L4awvfGrnlcQqGOorNEYkw/Yallah-Spa-%E2%80%94-Gift-Page-Redesign)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square)](https://tailwindcss.com/)

## Links

| | |
|---|---|
| **Live demo** | https://yallah-spa-1gai.vercel.app/ |
| **Before / After** | https://yallah-spa-1gai.vercel.app/compare |
| **Figma** | [Gift Page Redesign](https://www.figma.com/design/L4awvfGrnlcQqGOorNEYkw/Yallah-Spa-%E2%80%94-Gift-Page-Redesign) |
| **GitHub** | https://github.com/abubakr404/yallah-spa |

> Portfolio / interview submission. Design and source remain the author’s work unless a formal agreement says otherwise.

## Highlights

- **3-step gift journey** — Choose → Personalize → Review (clear stepper, less clutter than a single long page)
- **Arabic RTL first** — Tajawal, mirrored chrome, sheets/dialogs that feel native in Arabic
- **Desktop + mobile** — shared components; filters/assistant/visit open as dialogs on desktop and bottom sheets on mobile
- **Atomic Design** — atoms → molecules → organisms aligned with the Figma file
- **Mock API layer** — fetch-shaped clients over mock data (ready to swap for a real backend)
- **Before / After** — live old screenshots vs redesign on `/compare` (also in Figma)

## Stack

- **pnpm** · **Next.js** App Router · **React** · **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** patterns (custom Yallah chrome)
- **next-intl** — Arabic primary; English catalog prepared
- **Figma** — components + Auto Layout; Design System page in the app

## Run locally

```bash
pnpm install
pnpm dev
pnpm build
```

Open [http://localhost:3000](http://localhost:3000).

Optional: copy `.env.example` → `.env.local` and set `NEXT_PUBLIC_SITE_URL` for canonical/SEO URLs.

## Main routes

| Route | Purpose |
|---|---|
| `/` | Welcome / intro |
| `/gifts` | Browse packages & sessions |
| `/gifts/search` | Search, filter, pagination |
| `/gifts/personalize` | Names, message, card theme, visit |
| `/gifts/review` | Cart + invoice summary |
| `/gifts/success` | Share / download / copy link |
| `/compare` | Before / After showcase |
| `/design-system` | Tokens & component gallery |

Login, payment, and real WhatsApp delivery are **out of scope** per the brief.

## Project layout

```
messages/                  → UI + catalog copy (ar primary, en prepared)
src/i18n/                  → locale routing & navigation helpers
src/app/[locale]/          → pages
src/components/            → atoms | molecules | organisms
src/lib/api/               → mock-ready API clients
src/data/mocks/            → gifts, branches, profile
public/assets/images/      → product, hero, compare screenshots
```

## Author

**Abubakr Hisham** · UX/UI & Frontend  
GitHub: [abubakr404](https://github.com/abubakr404)
