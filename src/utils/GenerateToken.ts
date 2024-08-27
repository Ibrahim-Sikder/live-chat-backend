
import jwt from 'jsonwebtoken'
import config from '../app/config';

export const generateToken = (id:string) => {
  return jwt.sign({ id }, config.jwt_secrete as string, {
    expiresIn: "30d",
  });
};
