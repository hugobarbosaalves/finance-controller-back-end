import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    userName: string;
    password: string;
    email: string;
    rules: string[];
}

export const UserSchema = new Schema<IUser>({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    rules: { type: [String], required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
