
import { TMessage } from './message.interface';
import { Message } from './message.model';

const createMessage = async (payload: TMessage) => {
  const result = await Message.create(payload);
  return result;
};

const getAllMessagesByChatId = async (chatId: string) => {
  const result = await Message.find({ chat: chatId })
    .populate('sender', 'name email') // Populating sender's name and email
    .populate('chat')
    .populate('readBy', 'name email'); // Populating readers' name and email
  return result;
};

const getSingleMessage = async (id: string) => {
  const result = await Message.findById(id)
    .populate('sender', 'name email')
    .populate('chat')
    .populate('readBy', 'name email');
  return result;
};

const updateMessage = async (id: string, payload: Partial<TMessage>) => {
  const result = await Message.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate('sender', 'name email')
    .populate('chat')
    .populate('readBy', 'name email');
  return result;
};

const deleteMessage = async (id: string) => {
  const result = await Message.findByIdAndDelete(id);
  return result;
};

export const messageServices = {
  createMessage,
  getAllMessagesByChatId,
  getSingleMessage,
  updateMessage,
  deleteMessage,
};
