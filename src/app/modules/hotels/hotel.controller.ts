import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { hotelServices } from './hotel.service';


const createHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await hotelServices.createHotel(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Hotel create succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getAllHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await hotelServices.getAllHotel(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Hotel are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};


export const countByCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Request Received:', req.method, req.url);
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ success: false, message: 'City parameter is required.' });
    }

    const result = await hotelServices.countByCity({ cities: city as string });
    console.log('Count Result:', result);
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Hotels are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.error('Error:', err);
    next(err);
  }
};


const countByType = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const result = await hotelServices.countByType();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Hotel are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};



const getSingleHotel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await hotelServices.getSinigleHotel(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Hotel is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await hotelServices.deleteHotel(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Hotel deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await hotelServices.updateHotel(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Hotel update succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const hotelControllers = {
  getAllHotel,
  getSingleHotel,
  deleteHotel,
  updateHotel,
   createHotel,
   countByCity,
   countByType
};
