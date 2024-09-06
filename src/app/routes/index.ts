/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';

import { authRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { chatRoutes } from '../modules/chat/chat.route';
import { messageRoutes } from '../modules/message/message.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/chat',
    route: chatRoutes,
  },
  {
    path: '/message',
    route: messageRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
