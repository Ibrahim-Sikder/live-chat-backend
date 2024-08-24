import { z } from 'zod';

const createUserValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, { message: 'Password must be at least 6 characters long' }),
   
    role: z.enum(['super_admin', 'admin', 'user'], {
      errorMap: () => ({ message: 'Invalid role' }),
    }),
    status: z
      .enum(['in-progress', 'blocked'], {
        errorMap: () => ({ message: 'Invalid status' }),
      })
      .default('in-progress'),
    isDeleted: z.boolean().default(false),
  }),
});



export const userValidations = {
  createUserValidation,

};
