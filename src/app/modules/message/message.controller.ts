import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { messageServices } from './message.service';

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, chatId } = req.body;
    const senderId = req.user?._id;

    const result = await messageServices.createMessage({ content, chatId, senderId });
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Message created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const allMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatId = req.params.chatId;

    const messages = await messageServices.getAllMessages(chatId);


    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Messages retrieved successfully',
      data: messages,
    });
  } catch (err) {
    next(err);
  }
};
export const messageControllers = {
  sendMessage,
  allMessages
};
