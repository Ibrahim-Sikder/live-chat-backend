/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Document, Types } from 'mongoose';

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
    .populate('users','password')
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
 

    let chats = (await Chat.find({ users: { $elemMatch: { $eq: userId } } })
      .populate('users')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 })) as TChat[];

    if (chats.length === 0) {
    
      return chats;
    }


    chats = (await User.populate(chats, {
      path: 'latestMessage.sender',
      select: 'name pic email',
    })) as unknown as TChat[];

    return chats;
  } catch (error: any) {
    console.error('Error fetching chats:', error);
    throw new Error(error.message);
  }
};

const createGroupChat = async (
  name: string,
  users: string[],
  currentUserId: Types.ObjectId,
) => {
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

export const renameGroupChat = async (
  chatId: Types.ObjectId,
  chatName: string,
) => {
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true },
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');

  if (!updatedChat) {
    throw new Error('Chat Not Found');
  }

  return updatedChat;
};

export const addToGroup = async (
  chatId: Types.ObjectId,
  userId: Types.ObjectId,
) => {
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true },
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');

  if (!updatedChat) {
    throw new Error('Chat Not Found');
  }

  return updatedChat;
};
export const removeFromGroup = async (
  chatId: Types.ObjectId,
  userId: Types.ObjectId,
) => {
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true },
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');

  if (!updatedChat) {
    throw new Error('Chat Not Found');
  }

  return updatedChat;
};

export const chatServices = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
};
