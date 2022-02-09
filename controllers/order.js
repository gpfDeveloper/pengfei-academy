import User from 'models/User';
import Course from 'models/Course';
import PublishedCourse from 'models/PublishedCourse';
import { sendMessageServer } from './message';
import Order from 'models/Order';
import db from 'utils/db';
import mongoose from 'mongoose';

const _enrollmentServer = async (user, courseId, price, session) => {
  const learningList = user.learningList || [];
  const publishedCourse = await PublishedCourse.findById(courseId);
  if (!publishedCourse) {
    throw Error('Course not found');
  }
  const course = await Course.findById(publishedCourse.course).select(
    '+revenue'
  );
  if (learningList.indexOf(publishedCourse._id) === -1) {
    learningList.push(courseId);
    course.numOfStudents += 1;
    course.revenue += price;
  } else {
    throw Error('Already enrolled.');
  }
  user.learningList = learningList;

  await course.save({ session });
  //add welcome msg
  const senderId = publishedCourse.author;
  await sendMessageServer(session, senderId, user, publishedCourse.welcomeMsg);
};

export const createOrderAndBatchEnrollment = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const { order } = req.body;
  const user = await User.findById(userId).select('+totalPayment');
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  }

  const newOrder = new Order({
    ...order,
  });

  const session = await mongoose.startSession();
  session.startTransaction();
  user.totalPayment += order.totalAmount;
  for (const item of order.items) {
    await _enrollmentServer(user, item.courseId, item.price, session);
  }
  await newOrder.save({ session });
  await user.save({ session });
  await session.commitTransaction();
  res.status(200).send();
};
