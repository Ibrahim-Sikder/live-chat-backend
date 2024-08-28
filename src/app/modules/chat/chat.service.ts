/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Document, Types } from "mongoose";

import { User } from '../user/user.model';
import { TChat } from './chat.interface';
import { Chat } from './chat.model';


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
    .populate('users')
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
    
    // Find the chat and populate the users field
    const fullChat = await Chat.findOne({ _id: createdChat._id })
      .populate('users', '-password')
      .populate('latestMessage');

    return fullChat;
  }
};

const fetchChats = async (userId: Types.ObjectId): Promise<TChat[]> => {
  try {
    console.log('Querying chats for user:', userId);

    let chats = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
      .populate('users')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 }) as TChat[];

    if (chats.length === 0) {
      console.log('No chats found for user:', userId);
      return chats;
    }

    console.log('Chats queried, populating latest message sender...');
    chats = await User.populate(chats, {
      path: 'latestMessage.sender',
      select: 'name pic email',
    }) as unknown as TChat[];

    console.log('Chats successfully fetched and populated:', chats);
    return chats;
  } catch (error: any) {
    console.error('Error fetching chats:', error);
    throw new Error(error.message);
  }
};



const createGroupChat = async (name: string, users: string[], currentUserId: Types.ObjectId) => {
  if (!name || users.length < 2) {
    throw new Error('Group chat requires a name and at least 2 users');
  }

  users.push(currentUserId?.toString());

  const groupChat = await Chat.create({
    chatName: name,
    users,
    isGroupChat: true,
    groupAdmin: currentUserId,
  });

  const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
    .populate('users', '-password')
    .populate('groupAdmin', '-password');

  return fullGroupChat;
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
  createGroupChat,
  updateChat,
  deleteChat,
};
