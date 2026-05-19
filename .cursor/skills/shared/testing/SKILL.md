---
name: shared-testing
description: >-
  Conventions for tests in packages/shared. Vitest on Zod schemas with
  co-located *.test.ts files. Use when adding or changing schemas, validators,
  or tests under packages/shared, or when editing packages/shared/vitest.config.ts.
disable-model-invocation: true
---

# Shared package testing

Conventions for tests in `packages/shared`. Schemas are the primary test target; `types/` and `constants/` are usually covered by TypeScript and app-level tests unless they gain runtime logic.

## Stack

- **Runner:** Vitest (`vitest run`).
- **Config:** `packages/shared/vitest.config.ts` — `environment: "node"`, `include: ["src/**/*.test.ts"]`.
- **Validation API:** always `schema.safeParse(input)` in tests (same as backend controllers).

## Layout

- Tests are **co-located** with source as `*.test.ts`:
  - `src/schemas/housing.ts` ↔ `src/schemas/housing.test.ts`
- One test file per schema module. Do not bundle multiple schemas into one file.
- Do not add a separate `tests/` folder.
- **Do not** put Zod validation tests in `apps/backend` or `apps/frontend` — backend `app.test.ts` keeps a single HTTP smoke that validation errors return `400`; exhaustive rules live here.

## Writing tests

- Explicit imports — no globals:

  ```ts
  import { describe, expect, it } from "vitest";
  ```

- Import the schema from the sibling module with the `.js` extension (NodeNext ESM):

  ```ts
  import { housingSchema } from "./housing.js";
  ```

- Define a `valid*` fixture at the top with all required fields at valid defaults (zeros or minimal allowed values).
- Assert with `expect(result.success).toBe(true | false)`.

### Parameterizing over fields

Derive field lists from the schema shape so new fields get coverage without rewriting every test name:

```ts
const housingFields = Object.keys(housingSchema.shape).filter(
  (key) => key !== "household",
);

it.each(housingFields)("rejects negative %s", (field) => {
  const result = housingSchema.safeParse({ ...validHousing, [field]: -1 });
  expect(result.success).toBe(false);
});
```

For schemas where every key shares the same rule (e.g. all `nonnegative()`), use `Object.keys(schema.shape)` without filtering.

## What to test

### Leaf schema (`housing.ts`, `food.ts`, …)

For each Zod object schema:

- **Valid minimal input** — `safeParse` succeeds (fixture with zeros or allowed minimums).
- **Valid realistic input** — optional second case with typical positive numbers when it adds confidence.
- **Per-field constraints** — use `it.each` over `schema.shape` keys:
  - `.nonnegative()` → reject `-1` on each numeric field.
  - `.int().min(n)` → reject below minimum and non-integer (e.g. `household: 0`, `household: 1.5`).
  - Exclude keys with different rules from the shared `it.each` (e.g. filter out `household` before testing “negative usage fields”).
- **Missing required field** — omit one key from the fixture; expect failure. One case is enough per schema.

Do not assert on specific Zod `issues` message text unless a custom message is part of the contract (e.g. `min(1, "Minimum of 1 person")`).

### Composed schema (`footprint.ts`)

`footprintSchema` nests `housingSchema` and `foodSchema`. Test **composition only** — do not repeat every leaf rule here.

Cover at minimum:

- **Valid** — full `housing` + `food`; assert `success` and optionally `result.data` deep-equals input.
- **Missing top-level keys** — omit `housing` or `food`.
- **Nested invalid** — one case where nested `housing` fails (e.g. `household: 0`) and one where nested `food` fails (e.g. `dairy: -1`) to prove child schemas run inside the parent.

## Adding or changing a schema

In the **same change** as the schema:

1. Add or update `src/schemas/<name>.test.ts` following the checklists above.
2. If the schema is nested into `footprintSchema`, add or adjust cases in `footprint.test.ts` (missing key + nested invalid).
3. Run shared tests and workspace typecheck.

## Commands

From the repo root:

- `pnpm --filter @carbon-footprint-calculator/shared test` — run once.
- `pnpm --filter @carbon-footprint-calculator/shared test:watch` — watch mode.
- `pnpm test` — runs shared and backend (and any other package with a `test` script).
- `pnpm -r typecheck` — includes `*.test.ts` under `packages/shared/src`.

## Anti-patterns

- Do not test schemas through Express or supertest — that belongs in backend testing.
- Do not duplicate the same constraint in both a leaf schema test and `footprint.test.ts` (e.g. nine food negatives in `footprint.test.ts`).
- Do not import test globals via `globals: true` in `vitest.config.ts`.
- Do not add barrel `index` files for schemas or tests.