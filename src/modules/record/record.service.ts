import { RecordModel } from ".";
import dayjs from "dayjs";
import Record, { recordStatus, recordType } from "./record.model";
import { filterRecordInput } from "./record.schema";
import { queryType } from "../../types/type";

export const createRecord = (input: Record) => {
  return RecordModel.create(input);
};
export const getRecordsByUserIdAndFilter = (
  userId: string,
  query: queryType
) => {
  return RecordModel.find({ ...query, userId });
};
export const updatemultipleRecord = (updateOption: any) => {
  return RecordModel.updateMany(updateOption);
};
export const updateOneRecordById = (id: string, categoryId: string) => {
  return RecordModel.findByIdAndUpdate({ _id: id }, { $pull: { categoryId } });
};
export const filterRecords = (query: queryType) => {
  return RecordModel.find(query);
};

export const queryBuilder = (params: filterRecordInput) => {
  let query: queryType = {};
  if (params.type) {
    query["type"] = params.type;
  }
  if (params.status) {
    query["status"] = params.status;
  }
  if (params.dateFrom) {
    query["createdAt"] = {
      $gte: params.dateFrom,
    };
  }
  if (params.dateTo) {
    query["createdAt"] = { ...query["createdAt"], $lt: params.dateTo };
  }
  if (params.amountFrom) {
    query["amount"] = {
      $gte: params.amountFrom,
    };
  }
  if (params.dateTo) {
    query["amount"] = { ...query["amount"], $lt: params.amountTo };
  }
  return query;
};
