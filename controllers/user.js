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
    name: user.name,
    email: user.email,
    roles: user.roles,
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
      name: user.name,
      email: user.email,
      headline: user.headline,
      bio: user.bio,
      roles: user.roles,
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

export const clearUnReadNotificationCount = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user) {
    user.unReadNotificationCount = 0;
    try {
      await user.save();
      return res.status(200).send();
    } catch (err) {
      return res.status(500).json({ message: 'Clear failed.' });
    }
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};

export const getUnReadNotificationCount = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user) {
    const unReadNotificationCount = user.unReadNotificationCount;
    return res.status(200).send({ unReadNotificationCount });
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};

export const getNotifications = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user) {
    let notificationItems = [];
    if (user.notification) {
      const notificationObj = await Notification.findById(user.notification);
      notificationItems = notificationObj.items;
    }
    return res.status(200).json({
      notifications: notificationItems.map((noti) =>
        noti.toObject({ getters: true })
      ),
    });
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};

export const deleteNotificationItem = async (req, res) => {
  const notificationItemId = req.query.id;
  if (!notificationItemId) {
    return res
      .status(422)
      .json({ message: 'Notification item id not provided' });
  }
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user) {
    if (user.notification) {
      const notificationObj = await Notification.findById(user.notification);
      const notificationItems = notificationObj.items;
      const idx = notificationItems
        .map((noti) => noti._id.toString())
        .indexOf(notificationItemId);
      if (idx === -1) {
        return res.status(404).json({ message: 'Notification item not found' });
      }
      notificationItems.splice(idx, 1);
      await notificationObj.save();
      return res.status(200).send();
    } else {
      return res.status(404).json({ message: 'Notification not found' });
    }
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};
