import express from 'express';
import { messageControllers } from './message.controller';

const router = express.Router();

router.post('/', messageControllers.sendMessage);

export const messageRoutes = router;
