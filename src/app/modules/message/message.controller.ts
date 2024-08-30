import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { messageServices } from './message.service';

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract data from the request
    const { content, chatId } = req.body;
    const senderId = req.user?._id;

    // Call the service to create the message
    const result = await messageServices.createMessage({ content, chatId, senderId });

    // Send the response
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


export const messageControllers = {
  sendMessage,

};
