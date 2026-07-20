import { Router, type IRouter } from "express";
import { z } from "zod";

const HealthCheckResponse = z.object({ status: z.string() });

const router: IRouter = Router();

// /api/health  — primary health check (used by Render and Vercel to verify deployment)
router.get("/health", (_req, res) => {
  res.json(HealthCheckResponse.parse({ status: "ok" }));
});

// /api/healthz  — alias kept for backward compatibility
router.get("/healthz", (_req, res) => {
  res.json(HealthCheckResponse.parse({ status: "ok" }));
});

export default router;
