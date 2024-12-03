import { Types } from 'mongoose';

export interface IConversation {
  _id: Types.ObjectId;
  members: Types.ObjectId[];
  messages: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
    