import express from 'express';
import { validateRequest } from '../../../utils/validateRequest';
import { messageControllers } from './message.controller';
import { messageValidations } from './message.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(messageValidations.messageSchema),
  messageControllers.createMessage,
);

router.get('/', messageControllers.getAllMessagesByChatId);
router.get('/:id', messageControllers.getSingleMessage);
router.delete('/:id', messageControllers.deleteMessage);
router.patch(
  '/:id',

  messageControllers.updateMessage,
);

export const messageRoutes = router;
