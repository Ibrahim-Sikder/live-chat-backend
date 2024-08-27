/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { createToken } from './auth.utils';
import config from '../../config';
import { User } from '../user/user.model';

const loginUser = async (payload: { email: string; password: string }) => {
  console.log(payload);

  // Find the user by email
  const user = await User.findOne({ email: payload.email }); // Use findOne with email
  console.log(user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid email or password'); // Updated error message
  }

  // Check if the password matches
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid email or password'); // Updated error message
  }

  // Create JWT payload
  const JwtPayload = {
    id: user._id.toString(), // Use '_id' for JWT payload
    role: user.role,
    email: user.email,
  };

  // Generate tokens
  const accessToken = createToken(
    JwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  
  const refreshToken = createToken(
    JwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};


export const AuthServices = {
  loginUser,

};
