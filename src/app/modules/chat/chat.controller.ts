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


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Chats retrieved successfully',
    data: result,
  });
};

export const createGroupChat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, users } = req.body;

    if (!name || !users) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: 'Please fill all the fields' });
    }

    const parsedUsers = JSON.parse(users);

    const result = await chatServices.createGroupChat(
      name,
      parsedUsers,
      req.user?._id,
    );

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

const renameGroupChat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { chatId, chatName } = req.body;

    const result = await chatServices.renameGroupChat(chatId, chatName);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Group chat renamed successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const addToGroup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { chatId, userId } = req.body;

    const result = await chatServices.addToGroup(chatId, userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User added to group successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const removeFromGroup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { chatId, userId } = req.body;

    const result = await chatServices.removeFromGroup(chatId, userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User removed from group successfully',
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
  renameGroupChat,
  addToGroup,
  removeFromGroup,
};
