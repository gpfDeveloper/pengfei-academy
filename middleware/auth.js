import jwt from 'jsonwebtoken';
import db from 'utils/db';
import User from 'models/User';
import Conversation from 'models/Conversation';

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
    res.status(403).json({ message: 'Not instructor' });
  }
};

export const isAdmin = async (req, res, next) => {
  await db.connect();
  const user = await User.findById(req.user.id);
  if (user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not Admin' });
  }
};

export const canViewConversation = async (req, res, next) => {
  const conversationId = req.query.id;
  if (!conversationId) {
    return res.status(422).json({ message: 'Conversation Id not provide.' });
  }
  await db.connect();
  const user = await User.findById(req.user.id);
  const conversation = await Conversation.findById(conversationId).populate([
    { path: 'member1', select: 'name' },
    { path: 'member2', select: 'name' },
  ]);
  const member1 = conversation.member1;
  const member2 = conversation.member2;
  req.member1 = member1;
  req.member2 = member2;
  let canView = false;
  if (user.isAdmin) {
    canView = true;
  }
  if (
    user._id.toString() === member1._id.toString() ||
    user._id.toString() === member2._id.toString()
  ) {
    canView = true;
  }
  if (canView) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized to view messages.' });
  }
};
