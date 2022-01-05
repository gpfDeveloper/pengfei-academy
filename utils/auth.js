import jwt from 'jsonwebtoken';
import { SESSION_EXPIRE_SEC } from './constants';

export const signToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: SESSION_EXPIRE_SEC,
    }
  );
};
