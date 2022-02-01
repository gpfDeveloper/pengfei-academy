import mongoose from 'mongoose';
import User from 'models/User';
import TeachRequest from 'models/TeachRequest';
import Course from 'models/Course';
import CourseSection from 'models/CourseSection';
import Lecture from 'models/Lecture';
import PublishedCourse from 'models/PublishedCourse';
import PublishedCourseSection from 'models/PublishedCourseSection';
import PublishedLecture from 'models/PublishedLecture';
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
  return res.status(200).send();
};

const createPublishedLecture = async (
  lectureId,
  publishedCourseSection,
  session
) => {
  const lecture = await Lecture.findById(lectureId);
  const publishedLecture = new PublishedLecture();
  publishedLecture.section = publishedCourseSection._id;
  publishedLecture.course = publishedCourseSection.course;
  publishedLecture.lecture = lectureId;
  publishedLecture.title = lecture.title;
  publishedLecture.contentType = lecture.contentType;
  publishedLecture.article = lecture.article;
  lecture.publishedLecture = publishedLecture._id;
  publishedCourseSection.lectures.push(publishedLecture._id);
  await publishedLecture.save({ session });
  await lecture.save({ session });
};

const createPublishedCourseSection = async (
  sectionId,
  publishedCourse,
  session
) => {
  const courseSection = await CourseSection.findById(sectionId);
  const publishedCourseSection = new PublishedCourseSection();
  publishedCourseSection.course = publishedCourse._id;
  publishedCourseSection.courseSection = sectionId;
  publishedCourseSection.title = courseSection.title;
  publishedCourse.sections.push(publishedCourseSection._id);
  courseSection.publishedCourseSection = publishedCourseSection._id;
  for (const lectureId of courseSection.lectures) {
    await createPublishedLecture(lectureId, publishedCourseSection, session);
  }
  await publishedCourseSection.save({ session });
  await courseSection.save({ session });
};

const setPublishedCourseFields = (course, publishedCourse) => {
  publishedCourse.author = course.author;
  publishedCourse.title = course.title;
  publishedCourse.language = course.language;
  publishedCourse.learningObjectives = course.learningObjectives;
  publishedCourse.prerequisites = course.prerequisites;
  publishedCourse.courseForWho = course.courseForWho;
  publishedCourse.price = course.price;
  publishedCourse.category = course.category;
  publishedCourse.subcategory = course.subcategory;
  publishedCourse.description = course.description;
  publishedCourse.subtitle = course.subtitle;
};

const createPublishedCourse = async (course, session) => {
  const publishedCourse = new PublishedCourse();
  publishedCourse.course = course._id;
  course.publishedCourse = publishedCourse._id;
  course.isPublished = true;
  setPublishedCourseFields(course, publishedCourse);
  for (const sectionId of course.sections) {
    await createPublishedCourseSection(sectionId, publishedCourse, session);
  }
  await publishedCourse.save({ session });
  await course.save({ session });
};

const updatePublishedCourse = async (course, session) => {
  console.log('update', course);
};

export const updateCourseReviewReqApproveAndPublish = async (req, res) => {
  const reviewReqId = req.query.id;
  await db.connect();
  const reviewReq = await CourseReviewRequest.findById(reviewReqId).exec();
  reviewReq.status = COURSE_REVIEW_STATUS.approved;
  const course = await Course.findById(reviewReq.course).exec();
  course.reviewStatus = COURSE_REVIEW_STATUS.approved;

  const user = await User.findById(course.author).exec();

  let notification;
  const message = `Congratulation Your course: ${course.title} is published on the marketplace.`;
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

  //copy course, courseSection, lecture
  if (!course.publishedCourse) {
    await createPublishedCourse(course, session);
  } else {
    await updatePublishedCourse(course, session);
  }

  await reviewReq.save({ session });
  await notification.save({ session });
  await user.save({ session });
  await session.commitTransaction();

  return res.status(200).send();
};
