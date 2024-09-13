/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { createToken } from './user.utils';

const userRegister = async (payload: TUser) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email already exists.');
  }

  const newUser = await User.create({
    ...payload,
  });
  const jwtPayload = {
    auth: newUser._id.toString(),
    role: newUser.role,
    name: newUser.name,
    isVerified: newUser.isVerifyed,
    email: newUser.email,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    _id: newUser.id.toString(),
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
    token: accessToken,
  };
};
const userLogin = async (payload: any) => {
  const user = await User.findOne({
    email: payload?.email,
    password: payload?.password,
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const jwtPayload = {
    userId: user._id.toString(),
    role: user.role,
    name: user.name,
    isVerified: user.isVerifyed,
    email: user.email,

  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    },
  );

  return {
    accessToken,
    refreshToken,
    user: {
      userId: user._id,
      email: user.email,
      role: user.role,
      name:user.name,
      token: accessToken,
    },
  };
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
  console.log(decoded);

  const { userId, iat } = decoded;
  console.log(userId, iat);
};

export const UserService = {
  userRegister,
  userLogin,
  changePassword,
  refreshToken,
  getAllUsers,
};
