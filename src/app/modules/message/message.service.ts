

// import { getReceiverSocketId, io } from "../../../socket/server.js";

import { Conversation } from "../conversation/conversation.model";
import { Message } from "./message.model";

 const sendMessage = async (senderId: string, receiverId: string, message: string) => {
  // Check if conversation exists, otherwise create it
  let conversation = await Conversation.findOne({
    members: { $all: [senderId, receiverId] },
  });
  
  if (!conversation) {
    conversation = await Conversation.create({
      members: [senderId, receiverId],
    });
  }

  // Create a new message
  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });

<<<<<<< HEAD
  await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

  return message;
};


export const getAllMessages = async (chatId: string): Promise<TMessage[]> => {
  try {
    const messages = await Message.find({ chat: chatId })
    .populate("sender", "name pic email")
    .populate("chat")
  
    
    return messages;
  } catch (error:any) {
    throw new Error(error.message);
=======
  if (newMessage) {
    conversation.messages.push(newMessage._id);
>>>>>>> 1323505126b31e8e74d27ccce5d8d091b2bccef8
  }

  // Save the conversation and message in parallel
  await Promise.all([conversation.save(), newMessage.save()]);

  // Notify the receiver via socket if they are connected
  // const receiverSocketId = getReceiverSocketId(receiverId);
  // if (receiverSocketId) {
  //   io.to(receiverSocketId).emit("newMessage", newMessage);
  // }

  return newMessage;
};

const getMessages = async (senderId: string, chatUserId: string) => {
  // Find conversation between sender and receiver, populate messages
  const conversation = await Conversation.findOne({
    members: { $all: [senderId, chatUserId] },
  }).populate("messages");

  // Return an empty array if no conversation is found
  if (!conversation) {
    return [];
  }

  // Return the populated messages
  return conversation.messages;
};


export const messageServices = {
    sendMessage,
    getMessages,
}