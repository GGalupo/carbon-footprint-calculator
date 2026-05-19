---
name: frontend-testing
description: >-
  Conventions for frontend tests in apps/frontend. Vitest with jsdom and React
  Testing Library. Use when adding or changing tests under apps/frontend,
  editing vitest.config.ts, or modifying frontend components, containers, or
  API clients.
disable-model-invocation: true
---

# Frontend testing

Conventions for tests in `apps/frontend`.

## Stack

- **Runner:** Vitest (`vitest run`).
- **DOM:** `jsdom` via `environment: "jsdom"`.
- **Components:** `@testing-library/react` and `@testing-library/user-event`.
- **Matchers:** `@testing-library/jest-dom/vitest` in `src/test/setup.ts`.

## Layout

- Tests are **co-located** with source as `*.test.ts` or `*.test.tsx`:
  - `src/api/calculate-footprint.ts` ↔ `src/api/calculate-footprint.test.ts`
  - `src/containers/Calculator.tsx` ↔ `src/containers/Calculator.test.tsx`
- Vitest picks them up via `src/**/*.test.{ts,tsx}`. Do not introduce a separate top-level `tests/` folder.
- Shared test helpers and fixtures live in `src/test/` (e.g. `setup.ts`, `fixtures.ts`).

## Writing tests

- Explicit imports — no globals:

  ```ts
  import { describe, expect, it, vi } from "vitest";
  ```

- Type-only imports use `import type` (`verbatimModuleSyntax: true`).

- Prefer **roles and labels** (`getByRole`, `getByLabelText`) over test IDs.
- Match visible copy and accessible names with **regex** (e.g. `/Calculate footprint/`), not string literals. Do not use case-insensitive (`/i`) or anchor-only patterns (`^`, `$`) unless matching a full string is required.

- Mock **network boundaries** (`fetch` in API modules, `calculateFootprint` in container tests) — do not hit a real backend.

## What to test

### API client (`src/api/*.ts`)

- Happy path: correct URL, method, headers, body; parsed return value.
- Failure path: non-OK response throws a clear error.

### Presentational components (`src/components/**`)

- Renders key copy and formatted values from props.
- User actions invoke callbacks (e.g. Recalculate → `onRecalculate`).
- Empty or edge UI states (e.g. BreakdownChart with all-zero breakdown).

### Containers (`src/containers/**`)

- Initial form render.
- Sample-data / reset behavior on inputs.
- Submit flow: loading → results or error alert (mock the API module).
- Resetting actions

## Adding new frontend behavior

When you add or change UI or API client code, update the matching `*.test.tsx` / `*.test.ts` in the **same change**:

1. New API module → new co-located `*.test.ts` with mocked `fetch`.
2. New container with side effects → co-located test with mocked dependencies.
3. New presentational component → render + interaction tests for visible behavior.

## Commands

Run from the repo root:

- `pnpm --filter @carbon-footprint-calculator/frontend test` — run once (CI mode).
- `pnpm --filter @carbon-footprint-calculator/frontend test:watch` — watch mode.
- `pnpm -r typecheck` — includes `*.test.ts(x)` under `apps/frontend/src`.

## Anti-patterns

- Do not import test globals via `globals: true` in `vitest.config.ts`.
- Do not start the Vite dev server or Express backend in unit tests.
- Do not duplicate Zod schema validation tests — those belong in `packages/shared`.
- Do not assert on full recharts SVG trees; smoke the chart container or empty state only.
