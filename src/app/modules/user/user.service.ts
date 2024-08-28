/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from 'http-status';
import { generateToken } from '../../../utils/GenerateToken';
import { AppError } from '../../error/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

export const createUser = async (payload: TUser) => {
  const { name, email, password, pic } = payload;
  if (!name || !email || !password) {
    throw new AppError(httpStatus.NOT_FOUND, 'Please enter all field');
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User already exits!');
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User createion failed!');
  }

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    pic: user.pic,
    token: generateToken(user._id.toString()),
  };
};
export const login = async (payload: TUser) => {
  const { email, password } = payload;
  const user = await User.findOne({ email });
  if (user) {
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id.toString()),
    };
  }
  else{
    throw new AppError(httpStatus.NOT_FOUND,'Email or password do not match')
  }
};

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

export const UserServices = {
  getAllUsers,
  createUser,
  login,
};
