import { array, number, object, string, TypeOf, optional } from "zod";
import { z } from "zod";
import { recordType, recordStatus } from "./record.model";

export const createRecordSchema = object({
  body: object({
    descripion: string({
      required_error: "descripion is required",
    })
      .min(1)
      .max(50),
    categoryId: array(string()).optional(),
    amount: number().min(1),
    type: z.enum(["income", "expense"]),
    status: z.enum(["proccessing", "completed"]).optional(),
  }).superRefine((schema, ctx) => {
    if (schema.type === recordType.INCOME && schema.status) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The status should not have an income record",
      });
    }
    if (schema.type === recordType.EXPENSE && !schema.status) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Status is required for type expense",
        path: ["status"],
      });
    }
  }),
});

export const filterRecordSchema = object({
  query: object({
    dateFrom: string().optional(),
    dateTo: string().optional(),
    amountFrom: optional(z.string().transform(Number)),
    amountTo: optional(z.string().transform(Number)),
    type: optional(z.enum([recordType.INCOME, recordType.EXPENSE])),
    status: optional(
      z.enum([recordStatus.COMPLETED, recordStatus.PROCCESSING])
    ),
  }),
});

export type filterRecordInput = TypeOf<typeof filterRecordSchema>["query"];

export type createRecordInput = TypeOf<typeof createRecordSchema>["body"];
