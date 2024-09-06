import httpStatus from 'http-status';

import { ProductServices } from './product.service';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';

const createProduct = catchAsync(async (req, res) => {
  console.log(req.body.data)
  const result = await ProductServices.createProduct(req.file,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product create successfully!',
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProduct();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product are retrieve successfully!',
    data: result,
  });
});
const getSingleProduct = catchAsync(async (req, res) => {
    const {productId} = req.params
  const result = await ProductServices.getSingleProduct(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single product is retrieve successfully!',
    data: result,
  });
});
const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProduct();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieve successfully!',
    data: result,
  });
});
const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProduct();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieve successfully!',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
