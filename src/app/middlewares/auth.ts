import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User } from '../modules/user/user.model';
import config from '../config';

// Extend the JwtPayload type to include `id` if it's part of your payload
interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as CustomJwtPayload;
 
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
