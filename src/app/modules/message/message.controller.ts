import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { messageServices } from './message.service';

const createMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await messageServices.createMessage(req.body);

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

const getAllMessagesByChatId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { chatId } = req.params;
    const result = await messageServices.getAllMessagesByChatId(chatId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Messages retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await messageServices.getSingleMessage(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Message retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await messageServices.updateMessage(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Message updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await messageServices.deleteMessage(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Message deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const messageControllers = {
  createMessage,
  getAllMessagesByChatId,
  getSingleMessage,
  updateMessage,
  deleteMessage,
};
