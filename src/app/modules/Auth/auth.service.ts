/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { createToken } from './auth.utils';
import config from '../../config';
import { User } from '../user/user.model';
import { TUser } from '../user/user.interface';

const register = async (payload: TUser) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email already exists.');
  }

  const user = await User.create({
    ...payload,
  });
  const JwtPayload = {
    id: user._id.toString(),
    role: user.role,
    email: user.email,
  };

  const accessToken = createToken(
    JwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    JwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    user: {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
  };
};

const loginUser = async (payload: { email: string; password: string }) => {
  console.log(payload);

  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid email or password');
  }

  // if (!(await User.isPasswordMatched(payload.password, user.password))) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'Email or password do not matched!');
  // }

  const JwtPayload = {
    id: user._id.toString(),
    role: user.role,
    email: user.email,
  };

  const accessToken = createToken(
    JwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    JwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    user: {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
  };
};

export const AuthServices = {
  loginUser,
  register,
};
