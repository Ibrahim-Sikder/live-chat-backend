/* eslint-disable no-unused-vars */
import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";

const userSchema = new Schema<TUser, UserModel>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  phone: {
    type: String,

  },
  role: {
    type: String,
    enum: ['user', 'admin', 'super_admin'],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['active', 'block'],
    default: 'active',
  },
  address: {
    type: String,
  
  },
  profile: {
    type: String,
    
  },
  otp: {
    type: String,
  },
  expiredOtpDate: {
    type: Date,
  },
  isVerifyed: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});


userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await this.findOne({ _id: id }); 
};

// You can also add additional static methods or instance methods if needed
userSchema.statics.findByEmail = async function (email: string) {
  return await this.findOne({ email });
};

export const User = model<TUser, UserModel>('User', userSchema);
