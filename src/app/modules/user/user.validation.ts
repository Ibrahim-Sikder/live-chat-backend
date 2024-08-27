import { z } from 'zod';

const createUserValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    pic: z.string().url().optional().default('https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'),
    role: z.enum(['super_admin', 'admin', 'user'], {
      errorMap: () => ({ message: 'Invalid role' }),
    }),
  }),
});



export const userValidations = {
  createUserValidation,

};
