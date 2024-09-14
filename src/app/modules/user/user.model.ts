/* eslint-disable no-unused-vars */
import { Schema, model } from "mongoose";
import { TUser,  UserModel } from "./user.interface";
import bcrypt from 'bcrypt'
const userSchema = new Schema<TUser, UserModel>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,

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
  isVerified: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await this.findOne({ _id: id }); 
};
userSchema.methods.isPasswordMatched = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// You can also add additional static methods or instance methods if needed
userSchema.statics.findByEmail = async function (email: string) {
  return await this.findOne({ email });
};

export const User = model<TUser, UserModel>('User', userSchema);
