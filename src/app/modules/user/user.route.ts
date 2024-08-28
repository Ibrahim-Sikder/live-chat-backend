import express from 'express';
import { UserController } from './user.controller';
import { protect } from '../../middlewares/auth';
const router = express.Router();

router.get('/',protect, UserController.getAllUser);
router.post('/', UserController.createUser);
router.post('/login', UserController.login);
export const userRoutes = router;
