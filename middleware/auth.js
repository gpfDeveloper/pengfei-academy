import jwt from 'jsonwebtoken';
import db from 'utils/db';
import User from 'models/User';

export const isLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    // Bearer xxx => xxx
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).json({ message: 'Token is not valid' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Token is not suppiled' });
  }
};

export const isInstructor = async (req, res, next) => {
  await db.connect();
  const user = await User.findById(req.user.id);
  if (user.isInstructor) {
    next();
  } else {
    res.status(401).json({ message: 'Not instructor' });
  }
};

export const isAdmin = async (req, res, next) => {
  await db.connect();
  const user = await User.findById(req.user.id);
  if (user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not Admin' });
  }
};
