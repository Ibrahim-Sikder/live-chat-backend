import { z } from 'zod';

// const loginValidationSchema = z.object({
//     body: z.object({
//       email: z.string({ required_error: 'Email is required' }),
//       password: z.string({ required_error: 'Password is required ' }),
//     }),
//   });

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().optional(),
    phone: z.string().optional(),
    password: z.string().optional(),
    otp: z.string().optional(),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required' }),
    newPassword: z.string({ required_error: ' Password is required ' }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required',
    }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'User id is requried' }),
    newPassword: z.string({ required_error: 'User password is requried' }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
