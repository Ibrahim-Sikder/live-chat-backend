/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';

import { auth } from '../../middlewares/auth';
import { messageController } from './message.controller';

const router = express.Router();

<<<<<<< HEAD
router.post('/',protect, messageControllers.sendMessage);
router.get("/:chatId", protect,messageControllers.allMessages)
export const messageRoutes = router;

=======



router.post("/send/:id", auth('admin','user','super_admin'), messageController.sendMessage);
router.get("/get/:id", auth('admin','user','super_admin'), messageController.getMessages);

export const messageRoutes = router;
>>>>>>> 1323505126b31e8e74d27ccce5d8d091b2bccef8
