# Agent guide — personal carbon footprint calculator

This project is a **full-stack personal carbon footprint calculator**: it estimates greenhouse gas emissions from everyday activities using published **emission factors** and clear assumptions. The stack turns user inputs into numbers **on the server** and serves them to a **React** client.

Methodology is intentionally grounded in common footprint breakdowns (see references)—similar in spirit to how organizations model operational footprints, applied here to **individual or household-style** inputs.

When implementing features, favor **clear APIs**, **consistent structure**, **documentation**, and **tests**. Factor choices should be **traceable** (cite sources in code or docs); the priority is **maintainable, understandable logic** over chasing perfect real-world precision in every category.

**Maintenance:** As `apps/` and `packages/` gain concrete folders and scripts, extend this file so agents stay aligned with the evolving layout.

---

## Product scope

| Area | Intent |
|------|--------|
| Categories | Cover **at least two** footprint categories aligned with [Shrink That Footprint — Calculate your carbon footprint](https://shrinkthatfootprint.com/calculate-your-carbon-footprint/). |
| Factors | Use factors from the references below, [EPA GHG Emission Factors Hub (PDF)](https://www.epa.gov/system/files/documents/2023-03/ghg_emission_factors_hub.pdf), or other reputable sources—**document the source** wherever factors are introduced or adjusted. |
| Reference UX | Optional comparison point: [EPA household calculator](https://www.epa.gov/carbon-footprint-calculator/) (e.g. ZIP `94114`). |
| Backend | **All emissions calculations run on the backend** and are exposed through **HTTP APIs**. |
| Stack | **Node.js + Express** (API). **React + Vite** (UI). |
| Persistence | **No database requirement** for the core brief: calculating and returning results is enough unless you deliberately add storage later. |

---

## Quality goals

1. **Clean, simple REST APIs** with explicit request/response shapes.
2. **Readable, consistent** code with sensible abstraction boundaries.
3. **Automated tests** where they buy confidence—especially calculation logic, services, and API contracts (Vitest; React Testing Library on the frontend).

---

## Reference links

- [Shrink That Footprint — Calculate your carbon footprint](https://shrinkthatfootprint.com/calculate-your-carbon-footprint/)
- [EPA — Carbon footprint calculator](https://www.epa.gov/carbon-footprint-calculator/)
- [EPA — GHG Emission Factors Hub (PDF)](https://www.epa.gov/system/files/documents/2023-03/ghg_emission_factors_hub.pdf)

**Sourcing constraint:** when introducing or updating emission factors, calculation formulas, or methodology, use **only** the three reference links above. Do not pull values, formulas, or category definitions from other websites, blog posts, or calculators.

---

## Monorepo layout

**Package manager:** `pnpm` **workspaces**.

| Path | Role |
|------|------|
| `apps/frontend` | React (Vite) client |
| `apps/backend` | Express API server |
| `packages/shared` | Shared Zod schemas, types, constants |

*(Add rows here as new apps or packages appear.)*

---

## Frontend (`apps/frontend`)

| Topic | Choice |
|-------|--------|
| Framework | React + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Forms | React Hook Form |
| Validation | Zod (prefer schemas aligned with `packages/shared`) |
| Charts | Recharts (via the shadcn `chart` primitive) |

Goals: fast DX, accessible UI, minimal custom primitive work.

### Architecture

The frontend uses the **Container / Presentational components** pattern (a.k.a. Smart / Dumb components):

| Folder | Role |
|--------|------|
| `src/containers/` | Smart components. Own state (`useState`, `useForm`), handlers, side effects, and compose presentational pieces. |
| `src/components/` | Presentational components. Pure UI, props in, JSX out. No local state beyond view-only details. |
| `src/components/ui/` | shadcn/ui primitives (button, card, input, label, collapsible, chart, ...). |
| `src/lib/` | Library related helpers |

Rules:

- Presentational components in `src/components/` must not import from `containers/` and must not own application state.

### Shared package imports

Use the `@shared/*` over the full package name:

```ts
import { housingSchema, type Housing } from "@shared/schemas/housing";
```

Still respect the **no barrel files** rule from the monorepo: import concrete subpaths, never an aggregated `index`.

---

## Backend (`apps/backend`)

| Topic | Choice |
|-------|--------|
| Runtime | Node.js |
| Framework | Express |
| Language | TypeScript |
| Validation | Zod (shared schemas where possible) |
| API style | REST, simple contracts |

### Architecture

Layered structure, no barrel files. Imports use concrete subpaths with the `.js` extension (NodeNext ESM).

| Folder | Role |
|--------|------|
| `src/server.ts` | Bootstrap. Reads env, calls `app.listen`. Keeps boot separate from wiring. |
| `src/app.ts` | Builds the Express app: `cors`, `express.json`, mounts routers. |
| `src/routes/` | Express routers. Thin — only wire HTTP verbs/paths to controllers. |
| `src/controllers/` | HTTP layer. Validate request bodies inline with `safeParse`, return `400` on failure, call services, shape the response. No calculation logic. |
| `src/services/` | Pure domain functions. One file per category (`housing.ts`, `food.ts`, ...) plus `footprint.ts` which composes them. Take validated input, return results. |
| `src/constants/` | Cross-service primitive constants (e.g. `date.ts` with `DAYS_PER_YEAR`, `WEEKS_PER_YEAR`). Reused by any service that needs them. |

Conventions:

- Calculation logic lives in `services/`, never in route handlers.
- Request validation uses shared Zod schemas from `@shared/schemas/*` via `safeParse`; controllers return `400 { error, issues }` inline on failure (no global error middleware for now).
- Response shapes are TypeScript-only types from `@shared/types/*`.

### Shared package imports

Use the `@shared/*` alias.
`tsx` (v4+) resolves these aliases at runtime, so no rewrite step is needed.

### Tests

Backend test conventions live in the **backend-testing** project skill at `.cursor/skills/backend/testing/SKILL.md`. Read it before adding or changing tests under `apps/backend`.

Frontend test conventions live in the **frontend-testing** project skill at `.cursor/skills/frontend/testing/SKILL.md`. Read it before adding or changing tests under `apps/frontend`.

### Scripts

Run from the repo root:

- `pnpm dev:backend` — start the backend in watch mode (`tsx watch`).
- `pnpm typecheck` — recursive across the workspace.

---

## Shared package (`packages/shared`)

Shared **Zod schemas**, **types**, and **constants** so frontend and backend stay in sync and duplication stays low.

Three folders, three purposes:

- `src/schemas/` — Zod schemas + inferred input types for things that cross the network (request bodies, form data). Used for runtime validation at the boundary.
- `src/types/` — TypeScript-only result/response shapes.
- `src/constants/` — cross-app primitive constants that belong to the API contract or shared UI labels (e.g. `EMISSION_UNIT = "kg CO2e/yr"` in `units.ts`).

Both apps import via the `@shared/*` alias (frontend through Vite, backend through `tsconfig` paths resolved by `tsx`):

```ts
import { housingSchema, type Housing } from "@shared/schemas/housing";
import type { FootprintResult } from "@shared/types/footprint";
import { EMISSION_UNIT } from "@shared/constants/units";
```

Import **concrete subpaths**, never an aggregated `index` (no barrel files).

### Tests

Schema validation tests live in the **shared-testing** project skill at `.cursor/skills/shared/testing/SKILL.md`. Read it before adding or changing schemas or `*.test.ts` under `packages/shared`.

---

## Testing

| Layer | Tooling | Source of truth |
|-------|---------|-----------------|
| Monorepo default | Vitest | — |
| Shared (`packages/shared`) | Vitest on Zod schemas | `.cursor/skills/shared/testing/SKILL.md` |
| Frontend | Vitest + React Testing Library | `.cursor/skills/frontend/testing/SKILL.md` |
| Backend | Vitest + supertest | `.cursor/skills/backend/testing/SKILL.md` |

Detailed conventions (layout, what to cover per service or route, supertest patterns, anti-patterns) live in the per-app testing skills, not in this file. The matching `.cursor/rules/*.mdc` auto-attach those skills when relevant files are in context (backend, frontend, shared).

---

## Conventions for agents

- **No barrel files:** do not add `index.ts` / `index.js` modules whose main job is re-exporting sibling files. Prefer direct imports from the module.
- Prefer **small modules**, **predictable REST** shapes, and **shared validation** from `packages/shared` using explicit subpath imports.
- Keep **calculation logic** testable and **out of** Express route handlers as much as practical.
- When adding or changing emission factors, **comment or cite** the source (URL or document section).
- Prefer changes that are **easy to explain and extend**—explicit naming and short rationale where behavior is non-obvious.
- Follow project **Cursor** guidance: conventional commits skill/rule under `.cursor/` when creating commits.