/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { hotelRoutes } from '../modules/hotels/hotel.route';
import { authRoutes } from '../modules/Auth/auth.route';
import { chatRoutes } from '../modules/chat/chat.route';
import { messageRoutes } from '../modules/message/message.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
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
