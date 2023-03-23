import Record from "./record.model";
import Category from "../category/category.model";
import { getModelForClass } from "@typegoose/typegoose";

export const RecordModel = getModelForClass(Record);
export const CategoryModel = getModelForClass(Category);
