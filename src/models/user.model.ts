import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
  role: z.enum(['user', 'admin']).default('user'),
  status: z.enum(['active', 'inactive', 'suspended']).default('active'),
});

export type UserInput = z.infer<typeof userSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const updateUserSchema = userSchema.partial().omit({ password: true });
export type UpdateUserInput = z.infer<typeof updateUserSchema>; 