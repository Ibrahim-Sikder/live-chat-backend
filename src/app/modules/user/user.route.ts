import express from 'express';
import { UserController } from './user.controller';
import { UserValidations } from './user.validation';
import { validateRequest } from '../../../utils/validateRequest';
import { protect } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  UserController.userRegister,
);

router.get('/',protect, UserController.getAllUser);
router.post(
  '/login',
  validateRequest(UserValidations.userLoginValidationSchema),
  UserController.userLogin,
);
router.post(
  '/change-password',
  validateRequest(UserValidations.changePasswordValidationSchema),
  UserController.changePassword,
);
router.post(
  '/refresh-token',
  validateRequest(UserValidations.refreshTokenValidationSchema),
  UserController.refreshToken,
);

export const UserRoutes = router;
