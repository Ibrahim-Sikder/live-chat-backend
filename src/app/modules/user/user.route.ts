import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

router.get('/', UserController.getAllUser);
router.post(
  '/',UserController.createUser,
);
export const userRoutes = router;
