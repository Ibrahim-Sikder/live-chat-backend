
import httpStatus from "http-status";
import sendResponse from "../../../utils/sendResponse";
import { messageServices } from "./message.service";
import { catchAsync } from "../../../utils/catchAsync";
import { AppError } from "../../error/AppError";

// Controller for sending a message
export const sendMessage = catchAsync(async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user?._id || req.user?.id; 


  if (!senderId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Sender ID is missing");
  }

  const newMessage = await messageServices.sendMessage(senderId, receiverId, message);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message sent successfully",
    data: newMessage,
  });
});


// Controller for retrieving messages
export const getMessages = catchAsync(async (req, res) => {
  const { id: chatUserId } = req.params;
  const senderId = req.user?._id || req.user?.id; 

  const messages = await messageServices.getMessages(senderId, chatUserId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Messages retrieved successfully",
    data: messages,
  });
});


export const messageController = {
   sendMessage,
   getMessages
}