import { describe, expect, it } from "vitest";
import request from "supertest";
import type { Footprint } from "@shared/schemas/footprint.js";
import { createApp } from "./app.js";
import { calculateFootprint } from "./services/footprint.js";

const validFootprint: Footprint = {
  housing: {
    household: 2,
    electricityKWhPerYear: 4000,
    naturalGasThermsPerYear: 120,
    heatingOilLitresPerYear: 30,
    lpgLitresPerYear: 10,
    wasteKgPerWeek: 12,
    waterLitresPerDay: 250,
  },
  food: {
    redMeat: 200,
    whiteMeat: 150,
    dairy: 300,
    cereals: 800,
    vegetables: 250,
    fruit: 150,
    oils: 100,
    snacks: 120,
    drinks: 180,
  },
};

const invalidFootprint: Footprint = {
  housing: {
    household: 0,
    electricityKWhPerYear: -100,
    naturalGasThermsPerYear: 120,
    heatingOilLitresPerYear: 30,
    lpgLitresPerYear: 10,
    wasteKgPerWeek: 12,
    waterLitresPerDay: 250,
  },
  food: {
    redMeat: 200,
    whiteMeat: 150,
    dairy: 300,
    cereals: 800,
    vegetables: 250,
    fruit: 150,
    oils: 100,
    snacks: 120,
    drinks: 180,
  },
};

describe("GET /health", () => {
  it("returns 200 with status ok", async () => {
    const app = createApp();

    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});

describe("POST /api/footprint/calculate", () => {
  it("returns the calculated footprint for a valid body", async () => {
    const app = createApp();
    const body = validFootprint;

    const response = await request(app)
      .post("/api/footprint/calculate")
      .send(body);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(calculateFootprint(body));
  });

  it("returns 400 when there is a validation error", async () => {
    const app = createApp();
    const body = invalidFootprint;

    const response = await request(app)
      .post("/api/footprint/calculate")
      .send(body);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("ValidationError");
  });
});
