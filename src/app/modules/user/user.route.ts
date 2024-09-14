/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { UserController } from './user.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();


router.get('/',auth('admin'), UserController.getAllUser);


export const UserRoutes = router;
