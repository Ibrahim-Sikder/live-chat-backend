/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { createToken } from './auth.utils';
import config from '../../config';
import { User } from '../user/user.model';
import { TUser } from '../user/user.interface';
import crypto from 'crypto';
import nodemailer from 'nodemailer'; 

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

const loginUser = async (payload: { email?: string; password: string; phone?: string }) => {
  let user;
  console.log(payload)

  if (payload.email) {
    user = await User.findOne({ email: payload.email });
  }
   else if (payload.phone) {
    user = await User.findOne({ phone: payload.phone });
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email or phone is required');
  }


  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid email, phone, or password');
  }
  console.log('from user after',user)
  const isPasswordMatched = await user.isPasswordMatched(payload.password); 
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email, phone, or password');
  }


  const otp = crypto.randomInt(100000, 999999).toString(); 
  const expiredOtpDate = new Date(Date.now() + 10 * 60 * 1000); 


  user.otp = otp;
  user.expiredOtpDate = expiredOtpDate;
  user.isVerified = false;
  await user.save();

  if (user.email) {
    await sendOtpEmail(user.email, otp);
  }


  // if (user.phone) {
  //   await sendOtpPhone(user.phone, otp);
  // }

  return {
    message: 'OTP sent to your email and phone',
    email: user.email,
  };
};

// const sendOtpPhone = async (phone: string, otp: string) => {
//   const client = twilio(config.twilio_account_sid, config.twilio_auth_token);

 
//   const phoneNumber = parsePhoneNumberFromString(phone, 'BD'); 

//   if (!phoneNumber || !phoneNumber.isValid()) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Invalid phone number format');
//   }

//   await client.messages.create({
//     body: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
//     from: config.twilio_phone_number, 
//     to: phoneNumber.number, 
//   });
// };


//   const client = twilio(config.twilio_account_sid, config.twilio_auth_token);

//   // Format phone number to E.164 format
//   const phoneNumber = parsePhoneNumberFromString(phone, 'BD'); // Replace 'BD' with your country code if different

//   if (!phoneNumber || !phoneNumber.isValid()) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Invalid phone number format');
//   }


//   await client.messages.create({
//     body: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
//     from: '01825445033',
//     to: `${phone}`,
//   });

//   // await client.messages.create({
//   //   body: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
//   //   from: config.twilio_phone_number, // Ensure this is set correctly
//   //   to: phoneNumber.number,
//   // });
// };
// Helper functions for sending OTP
const sendOtpEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ibrahimsikder5033@gmail.com',
      pass: 'bheb owyn erof xnpe',
    },
  });

  const mailOptions = {
    from: 'ibrahimsikder5033@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

const verifyOtp = async (payload: {
  email: string;
  otp: string;
  phone: string;
}) => {
  let user;
  if (payload.email) {
    user = await User.findOne({ email: payload.email });
  }
   else if (payload.phone) {
    user = await User.findOne({ phone: payload.phone });
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email or phone is required');
  }

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid email or password');
  }

  // Check if OTP is valid
  if (
    user.otp !== payload.otp ||
    !user.expiredOtpDate ||
    user.expiredOtpDate < new Date()
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid or expired OTP');
  }

  // OTP is correct and valid
  user.isVerified = true;
  user.otp = '';
  user.expiredOtpDate = null;
  await user.save();

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
  verifyOtp,
};
