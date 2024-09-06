import httpStatus from 'http-status';

import { UserService } from './user.service';
import config from '../../config';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';

const userRegister = catchAsync(async (req, res) => {
  const result = await UserService.userRegister(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User register successfully!',
    data: result,
  });
});
const userLogin = catchAsync(async (req, res) => {
  const result = await UserService.userLogin(req.body);
  const { accessToken, refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully!',
    data: {
      accessToken,
    },
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsers(req.query.search as string | undefined, req.user?._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users are retrieved successfully',
    data: result,
  });
});


const changePassword = catchAsync(async (req, res) => {
  const result = await UserService.changePassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully!',
    data: result,
  });
});
const refreshToken = catchAsync(async (req, res) => {
  console.log(req.cookies);
  const { refreshToken } = req.cookies;
  const result = await UserService.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});

export const UserController = {
  userRegister,
  userLogin,
  changePassword,
  refreshToken,
  getAllUser
};
