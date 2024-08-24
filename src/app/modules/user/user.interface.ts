import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'editor';
  isDeleted: boolean;
  status: 'in-progress' | 'blocked';
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(email: string): Promise<TUser>;
  isPasswordMatched(
    plaingTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
