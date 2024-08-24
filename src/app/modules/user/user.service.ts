/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const creatUser = async (payload: TUser) => {
  // const user = await User.isUserExistsByCustomId(payload.email);
  // console.log(user);
  // if (user) {
  //   throw new AppError(httpStatus.BAD_REQUEST, 'User is already exist!');
  // }

  const result = await User.create(payload);
  return result;
};
const getAllUser = async () => {
  const result = await User.find();
  return result;
};

export const UserServices = {
  creatUser,
  getAllUser,
};
