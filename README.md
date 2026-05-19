# Personal Carbon Footprint Calculator

<p align="center">
  <img src="assets/readme-hero.png" alt="Carbon footprint calculator — housing and food emissions" width="720" />
</p>

<p align="center">
  Estimate your annual carbon footprint from <strong>housing</strong> and <strong>food</strong> inputs.
</p>

---

## Tech stack

| Layer | Technologies |
|-------|----------------|
| **Monorepo** | [pnpm](https://pnpm.io/) workspaces |
| **Frontend** | [React](https://react.dev/), [Vite](https://vite.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/), [Recharts](https://recharts.org/) |
| **Backend** | [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/), [Zod](https://zod.dev/) |
| **Testing** | [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/react), [supertest](https://github.com/ladjs/supertest) |

---

## Project structure

```
carbon-footprint-calculator/
├── apps/
│   ├── frontend/                 # React + Vite UI
│   │   └── src/
│   │       ├── api/              # HTTP client (calculate footprint)
│   │       ├── components/       # Presentational UI (calculator, results, shadcn)
│   │       ├── containers/       # Smart components (forms, state, API calls)
│   │       ├── constants/
│   │       ├── lib/
│   │       └── test/             # Vitest setup & fixtures
│   └── backend/                  # Express API
│       └── src/
│           ├── server.ts         # Bootstrap & listen
│           ├── app.ts            # Express wiring (cors, json, routers)
│           ├── routes/           # HTTP paths → controllers
│           ├── controllers/      # Validation & response shaping
│           ├── services/         # Pure calculation logic
│           └── constants/
├── packages/
│   └── shared/                   # Cross-app contracts
│       └── src/
│           ├── schemas/          # Zod request validation
│           ├── types/            # TypeScript response shapes
│           └── constants/        # e.g. emission unit label
├── assets/                       # README images & media
├── package.json                  # Root scripts (dev, test, build, typecheck)
└── pnpm-workspace.yaml
```

---

## API

Base URL (local dev): `http://localhost:3001`  
The Vite dev server proxies `/api` → backend, so the frontend can call `/api/footprint/calculate` on the same origin.

All successful footprint values are in **`kg CO2e/yr`** (per person where noted in housing logic).

### `GET /health`

Liveness check.

| | |
|---|---|
| **200** | `{ "status": "ok" }` |

```http
GET /health HTTP/1.1
Host: localhost:3001
```

```json
{ "status": "ok" }
```

---

### `POST /api/footprint/calculate`

Calculate annual footprint from housing and food inputs.

#### `Footprint` (request)

| Field | Type | Description |
|-------|------|-------------|
| `housing` | object | Home energy, waste, water (see below) |
| `food` | object | Daily food energy by group (kCal / day) |

**`housing`**

| Field | Type | Constraints | Unit |
|-------|------|-------------|------|
| `household` | integer | ≥ 1 | people |
| `electricityKWhPerYear` | number | ≥ 0 | kWh / year |
| `naturalGasThermsPerYear` | number | ≥ 0 | therms / year |
| `heatingOilLitresPerYear` | number | ≥ 0 | litres / year |
| `lpgLitresPerYear` | number | ≥ 0 | litres / year |
| `wasteKgPerWeek` | number | ≥ 0 | kg / week |
| `waterLitresPerDay` | number | ≥ 0 | litres / day |

**`food`** (each field: number ≥ 0, kCal / day)

`redMeat`, `whiteMeat`, `dairy`, `cereals`, `vegetables`, `fruit`, `oils`, `snacks`, `drinks`

#### Example request

```http
POST /api/footprint/calculate HTTP/1.1
Host: localhost:3001
Content-Type: application/json
```

```json
{
  "housing": {
    "household": 2,
    "electricityKWhPerYear": 4000,
    "naturalGasThermsPerYear": 120,
    "heatingOilLitresPerYear": 30,
    "lpgLitresPerYear": 10,
    "wasteKgPerWeek": 12,
    "waterLitresPerDay": 250
  },
  "food": {
    "redMeat": 200,
    "whiteMeat": 150,
    "dairy": 300,
    "cereals": 800,
    "vegetables": 250,
    "fruit": 150,
    "oils": 100,
    "snacks": 120,
    "drinks": 180
  }
}
```

#### `FootprintResult`

```json
{
  "total": 12345.67,
  "housing": {
    "total": 8000,
    "breakdown": {
      "electricity": 1400,
      "naturalGas": 396,
      "heatingOil": 46.5,
      "lpg": 9,
      "waste": 156,
      "water": 13.6875
    }
  },
  "food": {
    "total": 4345.67,
    "breakdown": {
      "redMeat": 0,
      "whiteMeat": 0,
      "dairy": 0,
      "cereals": 0,
      "vegetables": 0,
      "fruit": 0,
      "oils": 0,
      "snacks": 0,
      "drinks": 0
    }
  }
}
```

#### `ValidationError`

```json
{
  "error": "ValidationError",
  "issues": [
    {
      "code": "too_small",
      "minimum": 1,
      "type": "number",
      "inclusive": true,
      "exact": false,
      "message": "Minimum of 1 person",
      "path": ["housing", "household"]
    }
  ]
}
```

---

## Prerequisites

- **[Node.js](https://nodejs.org/)** 20 or newer (LTS recommended)
- **[pnpm](https://pnpm.io/installation)** 9.x — version pinned in root `package.json` (`packageManager` field). Enable via [Corepack](https://nodejs.org/api/corepack.html): `corepack enable`

---

## Getting started

### 1. Install dependencies

From the repository root:

```bash
pnpm install
```

### 2. Run the backend

```bash
pnpm dev:backend
```

Listens on **http://localhost:3001** by default (`PORT` env optional).

### 3. Run the frontend

In a second terminal:

```bash
pnpm dev:frontend
```

Opens **http://localhost:5173** with `/api` proxied to the backend.

### Environment variables (optional)

| Variable | App | Default | Purpose |
|----------|-----|---------|---------|
| `PORT` | backend | `3001` | HTTP listen port |
| `CORS_ORIGIN` | backend | `http://localhost:5173` | Allowed browser origin |
| `VITE_API_BASE_URL` | frontend | `""` (same origin) | API base when not using the Vite proxy |

---

## Tests

Run the full workspace test suite from the root:

```bash
pnpm test
```

Per package (from root):

```bash
pnpm --filter @carbon-footprint-calculator/shared test
pnpm --filter @carbon-footprint-calculator/backend test
pnpm --filter @carbon-footprint-calculator/frontend test
```

Watch mode (inside an app or `packages/shared`):

```bash
pnpm test:watch
```

Typecheck everything:

```bash
pnpm typecheck
```

---

## Build

Production build for the **frontend** and compiled **shared** package:

```bash
pnpm build
```

This runs `build` in each workspace that defines it (`packages/shared`, `apps/frontend`). The backend runs via `tsx` in development and production-style `start` without a separate compile step:

```bash
pnpm --filter @carbon-footprint-calculator/backend start
```

Preview the frontend production bundle:

```bash
pnpm --filter @carbon-footprint-calculator/frontend preview
```

---

## Methodology & references

Emission factors and category structure follow published footprint guidance. Primary references:

- [Shrink That Footprint — Calculate your carbon footprint](https://shrinkthatfootprint.com/calculate-your-carbon-footprint/)
- [EPA — Carbon footprint calculator](https://www.epa.gov/carbon-footprint-calculator/)
- [EPA — GHG Emission Factors Hub (PDF)](https://www.epa.gov/system/files/documents/2023-03/ghg_emission_factors_hub.pdf)

Factor choices are documented in backend service code where they are defined.