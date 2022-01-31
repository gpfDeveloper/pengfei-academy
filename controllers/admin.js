import mongoose from 'mongoose';
import User from 'models/User';
import TeachRequest from 'models/TeachRequest';
import Course from 'models/Course';
import Notification from 'models/Notification';
import CourseReviewRequest from 'models/CourseReviewRequest';
import db from 'utils/db';
import { COURSE_REVIEW_STATUS, TEACH_REQUEST_STATUS } from 'utils/constants';

const { approved: APPROVED, rejected: REJECTED } = TEACH_REQUEST_STATUS;

export const getUsers = async (req, res) => {
  await db.connect();
  const users = await User.find();
  res.status(200).json(users.map((user) => user.toObject({ getters: true })));
};

export const getTeachRequests = async (req, res) => {
  await db.connect();

  const teachRequests = await TeachRequest.find().populate([
    { path: 'user', select: ['name', 'email', 'conversationWithAdmin'] },
  ]);

  res.status(200).json(
    teachRequests.map((teachReq) => ({
      ...teachReq.toObject({ getters: true }),
      userName: teachReq.user.name,
      userEmail: teachReq.user.email,
    }))
  );
};

export const updateTeachReqComment = async (req, res) => {
  const { comment } = req.body;
  const teachRequestId = req.query.id;
  await db.connect();
  const teachRequest = await TeachRequest.findById(teachRequestId).exec();
  teachRequest.adminComment = comment;
  await teachRequest.save();
  res.status(200).send();
};

export const rejectTeachRequest = async (req, res) => {
  const teachRequestId = req.query.id;
  await db.connect();
  const teachRequest = await TeachRequest.findById(teachRequestId).exec();
  const user = await User.findById(teachRequest.user);
  user.isInstructor = false;
  teachRequest.status = REJECTED;

  const session = await mongoose.startSession();
  session.startTransaction();
  await teachRequest.save({ session });
  await user.save(session);
  await session.commitTransaction();

  res.status(200).send();
};

export const approveTeachRequest = async (req, res) => {
  const teachRequestId = req.query.id;
  await db.connect();
  const teachRequest = await TeachRequest.findById(teachRequestId).exec();
  const user = await User.findById(teachRequest.user);
  user.isInstructor = true;
  teachRequest.status = APPROVED;
  let notification;
  const message = `Congratulation ${user.name}, you are approved to teach at Pengfei Academy!`;
  if (user.notification) {
    notification = await Notification.findOne({ user });
  } else {
    notification = new Notification({ user });
    user.notification = notification;
  }
  user.unReadNotificationCount += 1;
  notification.items.push({ message });

  const session = await mongoose.startSession();
  session.startTransaction();
  await teachRequest.save({ session });
  await user.save({ session });
  await notification.save(session);
  await session.commitTransaction();

  res.status(200).send();
};

export const setTeachReqHasMeeting = async (req, res) => {
  const teachRequestId = req.query.id;
  await db.connect();
  const teachRequest = await TeachRequest.findById(teachRequestId).exec();
  teachRequest.hasMeeting = true;
  await teachRequest.save();
  res.status(200).send();
};

export const getCourseReviewReqs = async (req, res) => {
  await db.connect();

  const courseReviewReqs = await CourseReviewRequest.find().populate([
    { path: 'user', select: ['name', 'email', 'conversationWithAdmin'] },
    { path: 'course', select: ['title'] },
  ]);

  res.status(200).json(
    courseReviewReqs.map((item) => ({
      ...item.toObject({ getters: true }),
      userName: item.user.name,
      userEmail: item.user.email,
      courseTitle: item.course.title,
    }))
  );
};

export const updateCourseReviewReqComment = async (req, res) => {
  const { comment } = req.body;
  const reviewReqId = req.query.id;
  await db.connect();
  const reviewReq = await CourseReviewRequest.findById(reviewReqId).exec();
  reviewReq.adminComment = comment;
  await reviewReq.save();
  res.status(200).send();
};

export const updateCourseReviewReqNeedFixes = async (req, res) => {
  const reviewReqId = req.query.id;
  await db.connect();
  const reviewReq = await CourseReviewRequest.findById(reviewReqId).exec();
  reviewReq.status = COURSE_REVIEW_STATUS.needsFixes;
  const course = await Course.findById(reviewReq.course).exec();
  course.reviewStatus = COURSE_REVIEW_STATUS.needsFixes;
  const user = await User.findById(course.author).exec();

  let notification;
  const message = `Your course: ${course.title} is need fixes, please contact pengfei for more information.`;
  if (user.notification) {
    notification = await Notification.findOne({ user });
  } else {
    notification = new Notification({ user });
    user.notification = notification;
  }
  user.unReadNotificationCount += 1;
  notification.items.push({ message });

  const session = await mongoose.startSession();
  session.startTransaction();
  await course.save({ session });
  await reviewReq.save({ session });
  await notification.save({ session });
  await user.save({ session });
  await session.commitTransaction();
  res.status(200).send();
};
