import mongoose, { Document, Schema } from 'mongoose';
import { IYear } from './Year';

export interface IBoard extends Document {
    createdAt: Date;
    updatedAt: Date;
    title: string;
    enabled: boolean;
    users: IUserInBoard[];
    years: IYear[];
}

export enum UserRolesInBoard {
    VISITOR = 'visitante',
    ADMIN = 'adm',
}

const financeRecordSchema = new Schema(
    {
        value: { type: Number, required: true },
        sumOperation: { type: Boolean, required: true },
        text: { type: String, required: true },
    },
    { _id: false },
);

const financeSessionSchema = new Schema(
    {
        title: { type: String, required: true },
        sumOperation: { type: Boolean, required: true },
        financeRecords: [financeRecordSchema],
    },
    { _id: false },
);

const monthSchema = new Schema(
    {
        january: [financeSessionSchema],
        february: [financeSessionSchema],
        march: [financeSessionSchema],
        april: [financeSessionSchema],
        may: [financeSessionSchema],
        june: [financeSessionSchema],
        july: [financeSessionSchema],
        august: [financeSessionSchema],
        september: [financeSessionSchema],
        october: [financeSessionSchema],
        november: [financeSessionSchema],
        december: [financeSessionSchema],
    },
    { _id: false },
);

export const BoardSchema = new Schema<IBoard>({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    title: { type: String, required: true },
    enabled: { type: Boolean, default: true, required: true },
    users: [
        {
            userId: { type: Schema.Types.ObjectId, required: true },
            email: { type: String, required: true },
            roleInThisBoard: { type: String, required: true },
        },
    ],
    years: [
        {
            year: { type: Number, required: true },
            months: { type: monthSchema, required: true },
        },
    ],
});

const Board = mongoose.model<IBoard>('Board', BoardSchema);

export interface IUserInBoard {
    userId: Schema.Types.ObjectId;
    email: string;
    roleInThisBoard: string;
}

export default Board;
