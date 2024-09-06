import express from 'express';
import { validateRequest } from '../../../utils/validateRequest';

import { chatControllers } from './chat.controller';
import { protect } from '../../middlewares/auth';
import { chatValidations } from './chat.validaton';

const router = express.Router();

router.post(
  '/', protect, validateRequest(chatValidations.ChatSchema),
  chatControllers.accessChat,
);

router.get('/',protect, chatControllers.fetchChats);

router.post('/group', protect,chatControllers.createGroupChat);
router.put('/groupadd',protect,  chatControllers.addToGroup);
router.patch('/rename', protect,chatControllers.renameGroupChat);
router.put('/groupremove', protect, chatControllers.removeFromGroup);
export const chatRoutes = router;
    