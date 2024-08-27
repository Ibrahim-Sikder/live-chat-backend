import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      pic: {
        type: String,
        required: true,
        default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg', 
      },
      isAdmin: { type: Boolean, required: true, default: false },
    },
    {
      timestamps: true, 
    }
);

export const User = model<TUser>('User', userSchema);
