import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import dayjs from "dayjs";
import { Category } from "../category/category.model";
import { User } from "../user/user.model";

export enum recordType {
  INCOME = "income",
  EXPENSE = "expense",
}

export enum recordStatus {
  PROCCESSING = "proccessing",
  COMPLETED = "completed",
}

@modelOptions({
  schemaOptions: {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
    // toJSON: {
    //     getters: true,
    // }
  },
})
export class Record {
  @prop({ type: String, required: true, enum: recordType })
  type: string;

  @prop({ type: String, enum: recordStatus })
  status: string;

  @prop({ required: true, type: String })
  descripion: string;

  @prop({ required: true, type: Number })
  amount: number;

  @prop({ ref: () => User })
  userId: Ref<User>;

  @prop({
    ref: () => Category,
    // foreignField: 'category',
    // localField: '_id', // compare this to the foreign document's value defined in "foreignField"
    // justOne: false
  })
  categoryId: Ref<Category>[];

  createdAt: Date;

  get dateTime(): string {
    return dayjs(this.createdAt).format();
  }
}

export default Record;
