import express from 'express';
import { messageControllers } from './message.controller';
import { protect } from '../../middlewares/auth';

const router = express.Router();

router.post('/',protect, messageControllers.sendMessage);
router.get("/:chatId", protect,messageControllers.allMessages)
export const messageRoutes = router;

