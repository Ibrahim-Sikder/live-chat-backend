
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

  // Populate fields
  message = await message.populate("sender", "name pic")
  message = await message.populate("chat")
  message = await User.populate(message, {
    path: "chat.users",
    select: "name pic email",
  });

  await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

  return message;
};
export const messageServices = {
  createMessage,

};
