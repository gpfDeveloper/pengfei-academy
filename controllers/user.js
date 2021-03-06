import bcrypt from 'bcryptjs';
import User from 'models/User';
import Notification from 'models/Notification';
import Conversation from 'models/Conversation';
import { getMember1, getMember2 } from './message';
import Message from 'models/Message';
import db from 'utils/db';
import { signToken } from 'utils/auth';
import PublishedCourse from 'models/PublishedCourse';
import mongoose from 'mongoose';
import Course from 'models/Course';
import { sendMessageServer } from './message';
import Order from 'models/Order';

//reset password
import cryptoRandomString from 'crypto-random-string';
import { SES } from 'utils/aws';
import { RESET_PASSWORD_EXPIRE_SEC } from 'utils/constants';
import Profile from 'models/Profile';

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
  conversation.member1 = getMember1(admin._id, user._id);
  conversation.member2 = getMember2(admin._id, user._id);
  const message = new Message({
    conversation: conversation._id,
    sender: admin._id,
    text: `Hi, ${user.name}, welcome to Pengfei Academy! I'm Pengfei and feel free to message me if you have any question.`,
  });
  conversation.lastMsg = message._id;
  user.unReadMsgCount += 1;
  user.conversationWithAdmin = conversation._id;

  const session = await mongoose.startSession();
  session.startTransaction();
  await user.save({ session });
  await notification.save({ session });
  await conversation.save({ session });
  await message.save({ session });
  await session.commitTransaction();

  res.send({
    token,
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  });
};

export const login = async (req, res) => {
  await db.connect();
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = signToken(user);
    let avatarUrl = null;
    if (user.profile) {
      const profile = await Profile.findById(user.profile);
      if (profile.avatar) {
        avatarUrl = profile.avatar.cfLocation;
      }
    }
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
      learningList: user.learningList,
      avatarUrl,
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

export const removeFromWishlist = async (req, res) => {
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
    const courseIdx = wishlist.indexOf(course._id);
    if (courseIdx !== -1) {
      wishlist.splice(courseIdx, 1);
    }
    user.wishlist = wishlist;
    await user.save();
    res.status(200).send();
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};

export const getWishlistCourseItems = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user) {
    let wishlist = user.wishlist || [];
    let courseItems = await PublishedCourse.find({ _id: { $in: wishlist } })
      .select([
        'title',
        'subtitle',
        'price',
        'category',
        'subcategory',
        'updatedAt',
      ])
      .populate([
        { path: 'author', select: ['name'] },
        { path: 'course', select: ['image'] },
      ]);
    return res.status(200).json({
      courseItems: courseItems.map((item) => ({
        ...item.toObject({ getters: true }),
        image: item.course.image,
      })),
    });
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};

//Free course enrollment
export const enrollment = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  const { courseId } = req.body;
  if (user) {
    const learningList = user.learningList || [];
    const publishedCourse = await PublishedCourse.findById(courseId);
    if (!publishedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const course = await Course.findById(publishedCourse.course);
    if (learningList.indexOf(publishedCourse._id) === -1) {
      learningList.push(courseId);
      course.numOfStudents += 1;
    } else {
      return res.status(422).json({ message: 'Already enrolled.' });
    }
    user.learningList = learningList;

    const session = await mongoose.startSession();
    session.startTransaction();
    await course.save({ session });
    //add welcome msg
    const senderId = publishedCourse.author;
    await sendMessageServer({
      senderId,
      receiverId: user._id.toString(),
      text: publishedCourse.welcomeMsg,
    });
    user.unReadMsgCount += 1;
    await user.save({ session });
    await session.commitTransaction();

    res.status(200).send();
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};

export const getLearningListCourseItems = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user) {
    let learningList = user.learningList || [];
    let courseItems = await PublishedCourse.find({ _id: { $in: learningList } })
      .select(['title', 'subtitle', 'category', 'subcategory', 'updatedAt'])
      .populate([
        { path: 'author', select: ['name'] },
        { path: 'course', select: ['image'] },
      ]);
    return res.status(200).json({
      courseItems: courseItems.map((item) => item.toObject({ getters: true })),
    });
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};

export const getPurchaseHistory = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }
  const _orders = await Order.find({ userEmail: user.email }).sort({
    createTime: 'desc',
  });
  const ret = [];
  for (const _order of _orders) {
    const order = {};
    order.createTime = _order.createTime;
    order.totalAmount = _order.totalAmount;
    order.items = [];
    for (const _item of _order.items) {
      const item = {};
      item.courseId = _item.courseId;
      item.courseTitle = _item.courseTitle;
      item.price = _item.price;
      order.items.push(item);
    }
    ret.push(order);
  }
  res.status(200).json({ orders: ret });
};

//send reset password email
const emailFrom = process.env.RESET_PASSWORD_EMAIL_FROM;
const webAppDomain = process.env.WEB_APP_DOMAIN;
export const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  if (email) {
    await db.connect();
    const user = await User.findOne({ email });
    if (user) {
      const token = cryptoRandomString({ length: 32, type: 'url-safe' });
      user.resetPasswordToken = token;
      user.resetPasswordTokenExpire =
        Date.now() + RESET_PASSWORD_EXPIRE_SEC * 1000;
      await user.save();
      const url = 'http://' + webAppDomain + '/user/forgot-password/' + token;
      const params = {
        Source: emailFrom,
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: `
                  <html>
                    <h1>Pengfei Academy Reset password</h1>
                    <p>Hi ${user.name},</p>
                    <p>A password reset for your account was requested.</p>
                    <p>Use the link below to change your password:</p>
                    <p>Note that this link is valid for 24 hours. After the time limit has expired, you will have to resubmit the request for a password reset.</p>
                    <h2>${url}</h2>
                  </html>
                `,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'Reset Password',
          },
        },
      };

      const emailSent = SES.sendEmail(params).promise();
      const result = await emailSent.then();
      console.log('reset password email result:', result);
    }
  }
  res.status(200).send();
};

export const resetPasswordFromEmail = async (req, res) => {
  const { password, email } = req.body;
  const { token } = req.query;
  if (!token || !password || !email) {
    return res.status(422).json({ message: 'Invalid input' });
  }
  await db.connect();
  const user = await User.findOne({
    email,
    resetPasswordToken: token,
    resetPasswordTokenExpire: { $gte: Date.now() },
  });
  if (!user) {
    res.status(401).send();
  }
  user.password = bcrypt.hashSync(password);
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  await user.save();
  res.status(200).send();
};
