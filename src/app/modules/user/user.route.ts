/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { UserController } from './user.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

<<<<<<< HEAD
router.get('/',protect, UserController.getAllUser);
router.post('/', UserController.createUser);
router.post('/login', UserController.login);
export const userRoutes = router;
=======

router.get('/', UserController.getAllUser);


export const UserRoutes = router;
>>>>>>> 1323505126b31e8e74d27ccce5d8d091b2bccef8
