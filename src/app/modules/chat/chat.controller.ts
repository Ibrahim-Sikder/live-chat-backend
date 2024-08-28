import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { chatServices } from './chat.service';

export const accessChat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.body;

    // Assuming req.user is populated with the authenticated user's details
    const result = await chatServices.accessChat(userId, req.user?._id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Chat accessed or created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const fetchChats = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const result = await chatServices.fetchChats(userId);

  console.log('Chats fetched successfully');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Chats retrieved successfully',
    data: result,
  });
};

export const createGroupChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, users } = req.body;

    if (!name || !users) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'Please fill all the fields' });
    }

    const parsedUsers = JSON.parse(users);

    const result = await chatServices.createGroupChat(name, parsedUsers, req.user?._id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Group chat created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await chatServices.updateChat(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Chat updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await chatServices.deleteChat(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Chat deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const chatControllers = {
  accessChat,
  fetchChats,
  createGroupChat,
  updateChat,
  deleteChat,
};
