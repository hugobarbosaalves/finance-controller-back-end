import mongoose, { Document, Schema } from 'mongoose';
import { FinanceRecordSchema, IFinanceRecord } from './FinanceRecord';

export interface IFinanceSession extends Document {
    title: string;
    financeRecords: IFinanceRecord[];
}

const FinanceSessionSchema: Schema = new Schema({
    title: { type: String, required: true },
    financeRecords: { type: [FinanceRecordSchema], required: true },
});

export default mongoose.model<IFinanceSession>(
    'FinanceSession',
    FinanceSessionSchema,
);
