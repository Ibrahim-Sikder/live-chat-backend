import { ObjectId, Types } from "mongoose";

export type TChat = {
    chatName: string;
    isGroupChat: boolean;
    users: Types.ObjectId[]; 
    latestMessage: Types.ObjectId; 
    groupAdmin: ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }


