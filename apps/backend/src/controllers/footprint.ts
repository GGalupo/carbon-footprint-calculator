import type { Request, Response } from "express";
import { footprintSchema } from "@shared/schemas/footprint.js";
import { calculateFootprint } from "../services/footprint.js";

export function calculateFootprintHandler(req: Request, res: Response): void {
  const parsed = footprintSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: "ValidationError",
      issues: parsed.error.issues,
    });
    return;
  }

  const result = calculateFootprint(parsed.data);
  res.status(200).json(result);
}
