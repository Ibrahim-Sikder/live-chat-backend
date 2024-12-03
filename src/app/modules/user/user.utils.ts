import jwt from 'jsonwebtoken';

export const createToken = (
    jwtPayload: { auth: string; role: string; isVerified: boolean },
    secret: string,
    expiresIn: string,
  ) => {
    return jwt.sign(jwtPayload, secret, {
      expiresIn,
    });
  };
  