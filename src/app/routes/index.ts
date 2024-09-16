/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/Auth/auth.route';
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
    path: '/message',
    route: messageRoutes,
  },


];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
