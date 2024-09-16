

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

  if (newMessage) {
    conversation.messages.push(newMessage._id);
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