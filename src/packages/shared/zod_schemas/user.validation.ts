import { CreateNewUserDTO, UpdateUserDTO } from '@/packages/core';
import { z } from 'zod';

export const CreateUserZodSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string({ message: 'Email is required' }).email('Invalid email address'),
  password: z
    .string({ message: 'Password is required' })
    .min(8, 'Password must be at least 8 characters long'),
}) satisfies z.ZodType<Omit<CreateNewUserDTO, 'id'>>;

export const UpdateUserZodSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty').optional(),
}) satisfies z.ZodType<UpdateUserDTO>;
