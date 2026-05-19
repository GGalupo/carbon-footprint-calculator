import type { Footprint } from "@shared/schemas/footprint";
import type { FootprintResult } from "@shared/types/footprint";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export async function calculateFootprint(
  input: Footprint,
): Promise<FootprintResult> {
  const response = await fetch(`${API_BASE}/api/footprint/calculate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`Calculation request failed (${response.status})`);
  }

  return response.json() as Promise<FootprintResult>;
}
