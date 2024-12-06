/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';

import { auth } from '../../middlewares/auth';
import { messageController } from './message.controller';

const router = express.Router();




router.post("/send/:id", auth('user','admin','super_admin'), 
messageController.sendMessage);
router.get("/get/:id", auth('admin','user','super_admin'), messageController.getMessages);

export const messageRoutes = router;