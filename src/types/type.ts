import { recordStatus, recordType } from "../modules/record/record.model"

export type createdAtType = {
    $gte?: string,
    $lt?: string
}

export type amountType = {
    $gte?: number,
    $lt?: number
}
export type queryType = {
    type?: recordType,
    status?: recordStatus,
    createdAt?: createdAtType,
    amount?: amountType
}