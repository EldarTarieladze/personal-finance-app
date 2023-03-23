import express from "express";
import validateResource from "../../middleware/validateResource";
import {
  createCategoryhandler,
  deleteCategoryHandler,
  getCategoriesHandler,
  getCategoryHandler,
  updateCategoryHandler,
} from "./category.controller";
import {
  createCategorySchema,
  deleteCategorySchema,
  getOneCategorySchema,
  updateCategorySchema,
} from "./category.schema";
const router = express.Router();

// update category

router.patch(
  "/category/:categoryId",
  validateResource(updateCategorySchema),
  updateCategoryHandler
);

// delete category

router.delete(
  "/category/:categoryId",
  validateResource(deleteCategorySchema),
  deleteCategoryHandler
);

// get all categories

router.get("/category", getCategoriesHandler);

// Get category

router.get(
  "/category/:categoryId",
  validateResource(getOneCategorySchema),
  getCategoryHandler
);

// Create Category

router.post(
  "/category",
  validateResource(createCategorySchema),
  createCategoryhandler
);

export default router;
