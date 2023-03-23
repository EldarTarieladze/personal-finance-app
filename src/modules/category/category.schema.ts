import { object, string, TypeOf } from "zod";

export const createCategorySchema = object({
  body: object({
    categoryName: string({
      required_error: "Category name is required",
    }),
  }),
});

export const getOneCategorySchema = object({
  params: object({
    categoryId: string(),
  }),
});

export const updateCategorySchema = object({
  params: object({
    categoryId: string(),
  }),
  body: object({
    categoryName: string(),
  }),
});

export const deleteCategorySchema = object({
  params: object({
    categoryId: string(),
  }),
});

export type deleteCategoryInput = TypeOf<typeof deleteCategorySchema>["params"];

export type createCategoryInput = TypeOf<typeof createCategorySchema>["body"];

export type getOneCategoryInput = TypeOf<typeof getOneCategorySchema>["params"];

export type updateCategoryInput = TypeOf<typeof updateCategorySchema>;
