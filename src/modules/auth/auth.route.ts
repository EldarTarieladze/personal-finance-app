import express from "express";
import validateResource from "../../middleware/validateResource";
import {
  createSessionHandler,
  refreshAccessTokenHandler,
} from "./auth.controller";
import { createSessionSchema } from "./auth.schema";

const router = express.Router();

router.post(
  "/sessions",
  validateResource(createSessionSchema),
  createSessionHandler
);

router.post("/sessions/refresh", refreshAccessTokenHandler);

export default router;
