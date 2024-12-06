/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const getAllUsers = async (
  search: string | undefined,
  userId: string | undefined,
): Promise<TUser[]> => {
  const keyword = search
    ? {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: userId } });
  return users;
};

const changePassword = async (payload: {
  oldPassword: string;
  newPassword: string;
}) => {
  const user = await User.findOne();
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (user.password !== payload.oldPassword) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password do not matched!');
  }

  const result = User.findOneAndUpdate({
    password: payload?.newPassword,
  });
  return result;
};
const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;
 

  const { userId, iat } = decoded;

};

export const UserService = {

  changePassword,
  refreshToken,
  getAllUsers,
};
