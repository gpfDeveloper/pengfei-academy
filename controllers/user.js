import bcrypt from 'bcryptjs';
import User from 'models/User';
import Notification from 'models/Notification';
import Conversation from 'models/Conversation';
import Message from 'models/Message';
import db from 'utils/db';
import { signToken } from 'utils/auth';
import PublishedCourse from 'models/PublishedCourse';

export const register = async (req, res) => {
  await db.connect();
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(422).json({ message: 'Email has been used already.' });
  }
  const user = new User({
    name,
    email,
    password: bcrypt.hashSync(password),
  });
  const token = signToken(user);

  const notiMsg = `Hi ${name}, welcome to Pengfei Academy!`;
  const notification = new Notification({ user: user._id });
  user.notification = notification._id;
  user.unReadNotificationCount = 1;
  notification.items.push({ message: notiMsg });

  const conversation = new Conversation();
  const admin = await User.findOne({ isAdmin: true });
  conversation.member1 = admin._id;
  conversation.member2 = user._id;
  const message = new Message({
    conversation: conversation._id,
    sender: admin._id,
    text: `Hi, ${user.name}, welcome to Pengfei Academy! I'm Pengfei and feel free to message me if you have any question.`,
  });
  conversation.lastMsg = message._id;
  user.unReadMsgCount += 1;
  user.conversationWithAdmin = conversation._id;

  await user.save();

  res.send({
    token,
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  });

  notification.save();
  conversation.save();
  message.save();
};

export const login = async (req, res) => {
  await db.connect();
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = signToken(user);
    res.json({
      token,
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      headline: user.headline,
      bio: user.bio,
      isAdmin: user.isAdmin,
      isInstructor: user.isInstructor,
      wishlist: user.wishlist,
    });
  } else {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
};

export const updateAccountSecurity = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const { email, newPassword, currentPassword } = req.body;
  const user = await User.findById(userId).select('+password');
  if (user && bcrypt.compareSync(currentPassword, user.password)) {
    user.email = email;
    if (newPassword.trim()) {
      user.password = bcrypt.hashSync(newPassword);
    }
    try {
      await user.save();
      return res.status(200).send();
    } catch (err) {
      return res.status(422).json({ message: 'Email already used.' });
    }
  } else {
    return res.status(401).json({ message: 'Incorrenct current password.' });
  }
};

export const getHeaderUserInfo = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user) {
    const unReadNotificationCount = user.unReadNotificationCount;
    const unReadMsgCount = user.unReadMsgCount;
    const isInstructor = user.isInstructor;
    return res
      .status(200)
      .send({ unReadNotificationCount, unReadMsgCount, isInstructor });
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};

export const getConversationWithAdminId = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user) {
    const conversationWithAdmin = user.conversationWithAdmin;
    return res.status(200).send({ conversationWithAdmin });
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};

export const addToWishlist = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  const { courseId } = req.body;
  if (user) {
    const wishlist = user.wishlist || [];
    const course = await PublishedCourse.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    if (wishlist.indexOf(course._id) === -1) {
      wishlist.push(courseId);
    }
    user.wishlist = wishlist;
    await user.save();
    res.status(200).send();
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};
