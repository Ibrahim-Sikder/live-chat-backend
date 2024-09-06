/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone:string,
  confirmPassword:string,
  role:'user' | 'admin' | 'super_admin',
  status: 'active' | 'block',
  address:string,
  profile:string,
  otp:string,
  expiredOtpDate:Date,
  isVerifyed:boolean,
  isCompleted:boolean,


};

export interface UserModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser>;
}
