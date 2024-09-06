import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    firstName: z.string({ required_error: 'First name is required' }),
    lastName: z.string({ required_error: 'Last name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Password is required' }),
    confirmPassword: z.string({ required_error: 'Confirm password is required' }),
    role: z.enum(['user', 'admin', 'super_admin']).default('user'),
    status: z.enum(['active', 'block']).default('active'),
    address: z.string().optional(),
    profile: z.string().optional(),
    otp: z.string().optional(),
    expiredOtpDate: z.string().optional(),
    isVerifyed: z.boolean().optional(),
    isCompleted: z.boolean().optional(),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  }),
});
const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});
const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required' }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required!' }),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  userLoginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
};
