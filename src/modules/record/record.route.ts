import express from "express";
import validateResource from "../../middleware/validateResource";
import { createRecordHandler, getRecordsHandler } from "./record.controller";
import { createRecordSchema, filterRecordSchema } from "./record.schema";

const router = express.Router();

router.post(
  "/records",
  validateResource(createRecordSchema),
  createRecordHandler
);
router.get("/records", validateResource(filterRecordSchema), getRecordsHandler);

export default router;
