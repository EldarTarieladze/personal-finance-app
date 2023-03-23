import { CategoryModel } from "../record";
import Category from "./category.model";

export const createCategory = (input: Partial<Category>) => {
  return CategoryModel.create(input);
};

export const findCategoryByName = (categoryName: string) => {
  return CategoryModel.findOne({ categoryName });
};

export const findOneCategoryById = (categoryId: string) => {
  return CategoryModel.findById(categoryId);
};
export const findOneCategoryByIdAndUserId = (
  categoryId: string,
  userId: string
) => {
  return CategoryModel.findOne({ _id: categoryId, userId })
    .populate({
      path: "records",
      select: "-__v",
    })
    .select("-__v");
};

export const findCategories = (userId: string) => {
  return CategoryModel.find({ userId })
    .populate({
      path: "records",
      select: "-__v",
    })
    .select("-__v");
};

export const findOneCategoryAndDelete = (
  categoryId: string,
  userId: string
) => {
  return CategoryModel.findOneAndDelete({ _id: categoryId, userId });
};
