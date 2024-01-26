// src/models/user.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export { User };
