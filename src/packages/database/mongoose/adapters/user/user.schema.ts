import { UserWithPassword } from '@/packages/core';
import { model, Schema } from 'mongoose';

const userSchema = new Schema<UserWithPassword>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<UserWithPassword>('User', userSchema);
