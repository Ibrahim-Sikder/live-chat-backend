import mongoose, { model, Schema } from 'mongoose';
import { TChat } from './chat.interface';

const chatModel = new mongoose.Schema<TChat>(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    groupAdmin: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export const Chat = model<TChat>('Chat', chatModel);

