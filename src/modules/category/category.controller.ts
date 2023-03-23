import { Request, Response } from "express";
import log from "../../utils/logger";
import {
  createCategory,
  findCategories,
  findCategoryByName,
  findOneCategoryAndDelete,
  findOneCategoryById,
  findOneCategoryByIdAndUserId,
} from "./category.service";
import {
  createCategoryInput,
  deleteCategoryInput,
  getOneCategoryInput,
  updateCategoryInput,
} from "./category.schema";
import { StatusCodes } from "http-status-codes";
import { updateOneRecordById } from "../record/record.service";

export const deleteCategoryHandler = async (
  req: Request<deleteCategoryInput>,
  res: Response
) => {
  const userId: string = res.locals.user._id;
  const { categoryId } = req.params;
  try {
    const category = await findOneCategoryAndDelete(categoryId, userId);

    if (!category)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Category not found" });

    for await (const { _id } of category.records) {
      await updateOneRecordById(String(_id), categoryId);
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Category was deleted successfully!" });
  } catch (e: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export const updateCategoryHandler = async (
  req: Request<updateCategoryInput["params"], {}, updateCategoryInput["body"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const { categoryId } = req.params;
  const { categoryName } = req.body;

  try {
    const category = await findOneCategoryById(categoryId);

    if (!category)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Category not found" });

    if (String(category.userId) !== userId)
      return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");

    category.categoryName = categoryName;

    await category.save();

    res.status(StatusCodes.OK).json({ category });
  } catch (e: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export const getCategoriesHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  try {
    const category = await findCategories(userId);
    res.status(StatusCodes.OK).json({ category });
  } catch (e: any) {
    log.info(e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export const getCategoryHandler = async (
  req: Request<getOneCategoryInput>,
  res: Response
) => {
  const { categoryId } = req.params;
  const userId = res.locals.user._id;
  try {
    const category = await findOneCategoryByIdAndUserId(categoryId, userId);
    res.status(StatusCodes.OK).json({ category });
  } catch (e: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export const createCategoryhandler = async (
  req: Request<{}, {}, createCategoryInput>,
  res: Response
) => {
  const body = req.body;
  const userId = res.locals.user._id;
  try {
    const categoryExists = await findCategoryByName(body.categoryName);
    if (String(categoryExists?.userId) === userId)
      return res.status(StatusCodes.CONFLICT).send("Category already exists");

    const category = await createCategory({ ...body, userId });

    return res.status(StatusCodes.CREATED).json({ category });
  } catch (e: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
};
