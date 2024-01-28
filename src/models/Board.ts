import mongoose, { Document, Schema } from 'mongoose';

export interface IBoard extends Document {
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean;
    users: [{ type: Schema.Types.ObjectId; ref: 'User' }];
    financeSessions: [{ type: Schema.Types.ObjectId; ref: 'FinanceSession' }];
}

export const BoardSchema = new Schema<IBoard>({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    enabled: { type: Boolean, default: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    financeSessions: [{ type: Schema.Types.ObjectId, ref: 'FinanceSession' }],
});

const Board = mongoose.model<IBoard>('Board', BoardSchema);

export default Board;
