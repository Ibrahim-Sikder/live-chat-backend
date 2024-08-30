/* eslint-disable @typescript-eslint/no-explicit-any */

import { Chat } from '../chat/chat.model';
import { User } from '../user/user.model';
import { TMessage } from './message.interface';
import { Message } from './message.model';

export const createMessage = async (data: { content: string; chatId: string; senderId: string }): Promise<TMessage> => {
  const { content, chatId, senderId } = data;

  if (!content || !chatId) {
    throw new Error("Invalid data passed into request");
  }

  const newMessage = {
    sender: senderId,
    content,
    chat: chatId,
  };

  let message = await Message.create(newMessage);

  message = await message.populate("sender", "name pic")
  message = await message.populate("chat")
  message = await User.populate(message, {
    path: "chat.users",
    select: "name pic email",
  });

  await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

  return message;
};

export const getAllMessages = async (chatId: string): Promise<TMessage[]> => {
  try {
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name pic email")
      .populate({
        path:'chat',
        populate:{
          path:'latestMessage',
          populate:{
            path:'sender',
            select:'name pic email'
          }
        }
      });
    
    return messages;
  } catch (error:any) {
    throw new Error(error.message);
  }
};

export const messageServices = {
  createMessage,
  getAllMessages

};
