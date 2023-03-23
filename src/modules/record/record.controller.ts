import dayjs from "dayjs";
import { Response, Request } from "express";
import StatusCode from "http-status-codes";
import { createRecordInput, filterRecordInput } from "./record.schema";
import {
  createRecord,
  getRecordsByUserIdAndFilter,
  queryBuilder,
} from "./record.service";

export const createRecordHandler = async (
  req: Request<{}, {}, createRecordInput>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const body = req.body;
  try {
    const record = await createRecord({ ...body, userId } as any);
    await record.save();
    res.json({ success: true });
  } catch (e: any) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};
export const getRecordsHandler = async (
  req: Request<{}, {}, {}, filterRecordInput>,
  res: Response
) => {
  const userId = res.locals.user._id;
  try {
    const query = queryBuilder(req.query);
    const records = await getRecordsByUserIdAndFilter(userId, query);

    res.status(StatusCode.OK).json({ records });
  } catch (e: any) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};
