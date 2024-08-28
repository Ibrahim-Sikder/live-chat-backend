import express from 'express';
import { validateRequest } from '../../../utils/validateRequest';
import { chatValidations } from './chat.validation';
import { chatControllers } from './chat.controller';
import { protect } from '../../middlewares/auth';


const router = express.Router();

router.post('/',validateRequest(chatValidations.ChatSchema),
  chatControllers.accessChat,
);

router.get('/', protect, chatControllers.fetchChats);

router.post('/group', chatControllers.createGroupChat);
router.delete('/:id', chatControllers.deleteChat);
router.patch('/:id',chatControllers.updateChat);

export const chatRoutes = router;
