import express from 'express';
import { UserController } from './user.controller';
import { validateRequest } from '../../../utils/validateRequest';
import { userValidations } from './user.validation';
const router = express.Router();

router.get('/', UserController.getAllUser);
router.post(
  '/',
  validateRequest(userValidations.createUserValidation),
  UserController.createUser,
);
export const userRoutes = router;
