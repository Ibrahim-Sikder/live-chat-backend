/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Document, Types } from "mongoose";

import { User } from '../user/user.model';
import { TChat } from './chat.interface';
import { Chat } from './chat.model';

type PopulatedChatType = Document<unknown, {}, TChat> & TChat & { _id: Types.ObjectId };

export const accessChat = async (userId: string, currentUserId: string) => {
  if (!userId) {
    throw new Error('UserId param not sent with request');
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: currentUserId } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate('users', '-password')
    .populate('latestMessage');

  // Populate the sender of the latest message if it exists
  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'name pic email',
  });

  if (isChat.length > 0) {
    return isChat[0];
  } else {
    const chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [currentUserId, userId],
    };

    const createdChat = await Chat.create(chatData);
    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      'users',
      '-password'
    );
    return fullChat;
  }
};

const fetchChats = async (userId: Types.ObjectId): Promise<TChat[]> => {
  try {
    console.log('Querying chats for user:', userId);

    let chats = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 }) as TChat[]; 

    console.log('Chats queried, populating latest message sender...');
    chats = await User.populate(chats, {
      path: 'latestMessage.sender',
      select: 'name pic email',
    }) as unknown as TChat[];

    console.log('Chats successfully fetched and populated');
    return chats;
  } catch (error: any) {
    console.error('Error fetching chats:', error);
    throw new Error(error.message);
  }
};


const getSingleChat = async (id: string) => {
  const result = await Chat.findById(id).populate("users", "-password").populate("groupAdmin", "-password").populate("latestMessage");
  return result;
};

const updateChat = async (id: string, payload: Partial<TChat>) => {
  const result = await Chat.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate("users", "-password").populate("groupAdmin", "-password").populate("latestMessage");
  return result;
};

const deleteChat = async (id: string) => {
  const result = await Chat.deleteOne({ _id: id });
  return result;
};

export const chatServices = {
  accessChat,
  fetchChats,
  getSingleChat,
  updateChat,
  deleteChat,
};
