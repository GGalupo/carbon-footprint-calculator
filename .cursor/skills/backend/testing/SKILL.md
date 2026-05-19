---
name: backend-testing
description: >-
  Conventions for backend tests in apps/backend. Vitest for unit tests on
  services and supertest for HTTP integration against createApp(). Use when
  adding or changing tests under apps/backend, editing vitest.config.ts, or
  modifying backend services, controllers, routes, or app.ts.
disable-model-invocation: true
---

# Backend testing

Conventions for tests in `apps/backend`.

## Stack

- **Runner:** Vitest (`vitest run`).
- **HTTP integration:** `supertest` against the Express app from `createApp()` — no real `listen`.
- **Config:** `apps/backend/vitest.config.ts` aliases `@shared` to `packages/shared/src` to mirror the tsconfig path.

## Layout

- Tests are **co-located** with source as `*.test.ts`:
  - `src/services/food.ts` ↔ `src/services/food.test.ts`
  - `src/app.ts` ↔ `src/app.test.ts`
- Vitest picks them up via `src/**/*.test.ts`. Do not introduce a separate `tests/` folder.
- One test file per source file. Do not bundle multiple service test suites into one file.

## Writing tests

- Explicit imports — no globals:

  ```ts
  import { describe, expect, it } from "vitest";
  ```

- Type-only imports use `import type` (`verbatimModuleSyntax: true`):

  ```ts
  import type { Food } from "@shared/schemas/food.js";
  ```

- Relative source imports keep the `.js` extension (NodeNext ESM):

  ```ts
  import { calculateFoodFootprint } from "./food.js";
  ```

- Prefer `toBeCloseTo(value)` for any number derived from emission math. Direct `toBe` is fine when the expected value is exactly `0` or comes from integer arithmetic.

## What to test

### Pure service (`src/services/*.ts`)

For every category service (e.g. `housing.ts`, `food.ts`), cover at minimum:

- **Zero input** → `total === 0` and every `breakdown[key] === 0`.
- **Factor isolation** — set one field, leave the rest zero, assert the breakdown matches `input * periodsPerYear * factor` (and, for housing, divided by `household`).
- **Unit conversions** — assert that weekly/daily inputs are scaled by `WEEKS_PER_YEAR` / `DAYS_PER_YEAR` from `src/constants/date.ts`.
- **Breakdown sum** — `total` equals the sum of `breakdown` values.
- **Linearity / household scaling** where the service has division or per-period multiplication (e.g. doubling input doubles output; doubling `household` halves per-person totals).

Use the actual constants from `src/constants/date.ts` in test expectations, never hard-coded `365` / `52`.

### HTTP integration (`src/app.test.ts`)

Build the app per test with `const app = createApp();`. Do not share an app instance across files.

Cover for each route:

- **Happy path** — valid body, expected status, and body deep-equals the service output:

  ```ts
  expect(response.body).toEqual(calculateFootprint(body));
  ```

- **Validation failures** — at least one case per invariant in the shared Zod schema. For `POST /api/footprint/calculate` that means:
  - missing top-level field (e.g. omit `housing`)
  - negative numeric field (e.g. `electricityKWhPerYear: -1`)
  - `housing.household` below the schema minimum of `1`

  Each must return `400` with `{ error: "ValidationError", issues: [...] }` and a non-empty `issues` array.

- **Health and other thin routes** — at minimum a `200` + exact body match.

## Adding a new backend feature

When you add or change backend behavior, also touch the matching test file in the **same change**:

1. New category service → new `services/<category>.test.ts` covering the checklist above. Update `services/footprint.test.ts` to include the new sub-result and total.
2. New route → add cases in `src/app.test.ts` (happy path + every validation branch).

## Commands

Run from the repo root:

- `pnpm --filter @carbon-footprint-calculator/backend test` — run once (CI mode).
- `pnpm --filter @carbon-footprint-calculator/backend test:watch` — watch mode.
- `pnpm -r typecheck` — typecheck still runs across the workspace and includes `*.test.ts`.

## Anti-patterns

- Do not import test globals via `globals: true` in `vitest.config.ts`.
- Do not bypass `createApp()` by mounting routers directly in a test — the goal is to exercise the same wiring (`cors`, `express.json`, mounted routers) that production uses.
- Do not assert on floating-point equality without `toBeCloseTo`.
- Do not duplicate emission factor literals in tests; derive expected values from the same inputs the service consumes.
