import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import Record from "../record/record.model";
import { User } from "../user/user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    id: false,
  },
})
export class Category {
  @prop({ required: true, unique: true })
  categoryName: string;

  @prop({ ref: () => User })
  userId: Ref<User>;

  @prop({
    ref: () => Record,
    foreignField: "categoryId",
    localField: "_id",
    justOne: false,
  })
  records: Ref<Record>[];
}

export default Category;
