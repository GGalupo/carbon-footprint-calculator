import { Router } from "express";
import { calculateFootprintHandler } from "../controllers/footprint.js";

export const footprintRouter: Router = Router();

footprintRouter.post("/calculate", calculateFootprintHandler);
