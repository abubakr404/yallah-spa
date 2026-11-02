# Yallah Spa — Gift Page Redesign (Interview Test)

Next.js + Tailwind + shadcn/ui · Atomic Design · RTL

## Stack

- **pnpm** package manager
- **Next.js** App Router
- **Tailwind CSS v4** + **shadcn/ui** (RTL)
- **Atomic Design**: `atoms` → `molecules` → `organisms`
- **Mock API layer**: fetch-shaped clients that resolve mock data today, ready to swap to a real backend

## Scripts

```bash
pnpm install
pnpm dev
pnpm build
```

## Pages (this slice)

| Route | Purpose |
|---|---|
| `/` | Welcome / intro + Start → Design System |
| `/design-system` | Foundations + Atoms + Molecules + Organisms showcase |

Gift journey pages are **paused** until you review this slice.

## API / Mock pattern

```
src/lib/api/client.ts   → apiRequest() with USE_MOCK flag
src/lib/api/*.ts        → endpoint modules (fetchGifts, fetchBranches, …)
src/data/mocks/*.ts     → mock payloads
```

UI never imports mocks directly — it calls `fetchGifts()` etc. Flip `USE_MOCK` to `false` and set `NEXT_PUBLIC_API_BASE_URL` when a backend exists.

## Personalize welcome

Edit `src/data/mocks/profile.ts` for your name, role, and intro copy.
