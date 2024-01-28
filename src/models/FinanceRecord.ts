import mongoose, { Document, Schema } from 'mongoose';

export interface IFinanceRecord extends Document {
    value: number;
    sumOperation: boolean;
    text: string;
}

export const FinanceRecordSchema: Schema = new Schema({
    value: { type: Number, required: true },
    sumOperation: { type: Boolean, required: true },
    text: { type: String, required: true },
});

export default mongoose.model<IFinanceRecord>(
    'FinanceRecord',
    FinanceRecordSchema,
);
