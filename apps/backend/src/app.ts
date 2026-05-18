import express, { type Express } from "express";
import cors from "cors";
import { footprintRouter } from "./routes/footprint.js";
import { healthRouter } from "./routes/health.js";

export function createApp(): Express {
  const app = express();

  const DEFAULT_CORS_ORIGIN = "http://localhost:5173";
  const CORS_ORIGIN = process.env.CORS_ORIGIN ?? DEFAULT_CORS_ORIGIN;

  app.use(cors({ origin: CORS_ORIGIN }));
  app.use(express.json());

  app.use("/health", healthRouter);
  app.use("/api/footprint", footprintRouter);

  return app;
}
