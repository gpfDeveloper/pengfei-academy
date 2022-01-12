import bcrypt from 'bcryptjs';
import User from 'models/User';
import Notification from 'models/Notification';
import db from 'utils/db';
import { signToken } from 'utils/auth';

export const register = async (req, res) => {
  await db.connect();
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(422).json({ message: 'Email has been used already.' });
  }
  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password),
  });
  const user = await newUser.save();
  const token = signToken(user);

  const message = `Hi ${name}, welcome to Pengfei Academy!`;
  const notification = new Notification({ user });
  user.notification = notification;
  user.unReadNotificationCount = 1;
  notification.items.push({ message });
  await user.save();
  await notification.save();

  return res.send({
    token,
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    isInstructor: user.isInstructor,
    unReadNotificationCount: 1,
  });
};

export const login = async (req, res) => {
  await db.connect();
  const { email, password } = req.body;
  const user = await User.findOne({ email });
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
      unReadNotificationCount: user.unReadNotificationCount,
    });
  } else {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
};

export const updateAccountSecurity = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const { email, newPassword, currentPassword } = req.body;
  const user = await User.findById(userId);
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

export const updateProfileInfo = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const { name, bio, headline } = req.body;
  const user = await User.findById(userId);
  if (user) {
    user.name = name;
    user.bio = bio;
    user.headline = headline;
    try {
      await user.save();
      return res.status(200).send();
    } catch (err) {
      return res
        .status(422)
        .json({ message: 'Update profile failed, please try again latter' });
    }
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};

export const getHeaderUserInfo = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user) {
    const unReadNotificationCount = user.unReadNotificationCount;
    const isInstructor = user.isInstructor;
    return res.status(200).send({ unReadNotificationCount, isInstructor });
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};
