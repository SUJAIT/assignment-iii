import { z } from 'zod';

export const userValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(50, { message: 'Name must be at most 50 characters long' }),

  email: z
    .string()
    .email({ message: 'Invalid email address' }),

  password: z
    .string({ required_error: 'Password is required' })
    .min(1, { message: 'Password cannot be empty' }),

  role: z
    .enum(['user', 'admin'], {
      errorMap: () => ({
        message: 'Role must be either user or admin',
      }),
    })
    .default('user'),

  isBlocked: z.boolean().default(false),

//   createdAt: z.date().optional(),

//   updatedAt: z.date().optional(),
});


export const UserValidation = {
    userValidationSchema
}

