/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
  role: 'user' | 'admin' | 'super_admin';
  status: 'active' | 'block';
  address: string;
  profile: string;
  otp: string | null; 
  expiredOtpDate: Date | null;
  isVerified: boolean;
  isCompleted: boolean;
  isDeleted: boolean;
  isPasswordMatched(enteredPassword: string): Promise<boolean>;
};




export interface UserModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
  isUserExistByCustomId(id: string): Promise<TUser | null>;
}
export type TUserRole = keyof typeof USER_ROLE;
