/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import { ProductControllers } from './product.controller';

import { ProductValidationSchema } from './product.validation';
import { upload } from '../../../utils/sendImageToCloudinary';
import { validateRequest } from '../../../utils/validateRequest';


const router = express.Router();

// router.post(
//   '/create-product',
//   upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     next();
//   },
//   validateRequest(ProductValidationSchema.createProductValidationSchema),
//   ProductControllers.createProduct,
// );

// router.post(
//   '/create-product',
//   upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     try {
//       req.body = JSON.parse(req.body.data);
//       next();
//     } catch (error:any) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid JSON format in request body.',
//         error: error.message,
//       });
//     }
//   },
//   validateRequest(ProductValidationSchema.createProductValidationSchema),
//   ProductControllers.createProduct,
// );
router.post(
  '/create-product',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Raw Request Body:', req.body); // Log the raw body to debug issues
      req.body = JSON.parse(req.body.data);
      next();
    } catch (error: any) {
      console.error('JSON Parsing Error:', error); // Log the error for debugging
      return res.status(400).json({
        success: false,
        message: 'Invalid JSON format in request body.',
        error: error.message,
      });
    }
  },
  validateRequest(ProductValidationSchema.createProductValidationSchema),
  ProductControllers.createProduct,
);


router.get('/', ProductControllers.getAllProduct);
router.get('/:productId', ProductControllers.getSingleProduct);

export const ProductRoutes = router;
