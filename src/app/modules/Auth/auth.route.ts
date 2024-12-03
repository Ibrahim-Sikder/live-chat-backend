import express from 'express';
import { validateRequest } from '../../../utils/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import { UserValidations } from '../user/user.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);
router.post(
  '/verify',
  AuthController.verifyOtp,
);
router.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  AuthController.register,
);




export const authRoutes = router;
