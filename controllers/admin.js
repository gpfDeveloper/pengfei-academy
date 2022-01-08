import User from 'models/User';
import TeachRequest from 'models/TeachRequest';
import Notification from 'models/Notification';
import db from 'utils/db';
import {
  USER_ROLES,
  TEACH_REQUEST_STATUS,
  NOTIFICATION_TYPES,
} from 'utils/constants';

const { Instructor: RoleInstructor } = USER_ROLES;
const { approved: APPROVED, rejected: REJECTED } = TEACH_REQUEST_STATUS;
const { system: NotificationSystem } = NOTIFICATION_TYPES;

export const getUsers = async (req, res) => {
  await db.connect();
  const users = await User.find().select('-password');
  res.status(200).json(users.map((user) => user.toObject({ getters: true })));
};

export const getTeachRequests = async (req, res) => {
  await db.connect();

  const teachRequests = await TeachRequest.find().populate([
    { path: 'user', select: ['name', 'email'] },
  ]);

  res.status(200).json(
    teachRequests.map((teachReq) => ({
      ...teachReq.toObject({ getters: true }),
      userName: teachReq.user.name,
      userEmail: teachReq.user.email,
    }))
  );
};

export const updateComment = async (req, res) => {
  const { comment } = req.body;
  const teachRequestId = req.query.id;
  await db.connect();
  const teachRequest = await TeachRequest.findById(teachRequestId).exec();
  teachRequest.adminComment = comment;
  await teachRequest.save();
  res.status(200).send();
};

export const rejectRequest = async (req, res) => {
  const teachRequestId = req.query.id;
  await db.connect();
  const teachRequest = await TeachRequest.findById(teachRequestId).exec();
  const user = await User.findById(teachRequest.user);
  const idx = user.roles.indexOf(RoleInstructor);
  if (idx !== -1) {
    user.roles.splice(idx, 1);
  }
  teachRequest.status = REJECTED;
  await teachRequest.save();
  await user.save();
  res.status(200).send();
};

export const approveRequest = async (req, res) => {
  const teachRequestId = req.query.id;
  await db.connect();
  const teachRequest = await TeachRequest.findById(teachRequestId).exec();
  const user = await User.findById(teachRequest.user);
  if (user.roles.indexOf(RoleInstructor) === -1) {
    user.roles.push(RoleInstructor);
  }
  teachRequest.status = APPROVED;
  let notification;
  const message =
    'Congratulation, you are approved to teach at Pengfei Academy!';
  if (user.notification) {
    notification = user.populate('notification');
  } else {
    notification = new Notification({ user });
    user.notification = notification;
  }
  user.unReadNotificationCount += 1;
  notification.notifications.push({ message, type: NotificationSystem });
  await teachRequest.save();
  await user.save();
  await notification.save();
  res.status(200).send();
};

export const setHasMeeting = async (req, res) => {
  const teachRequestId = req.query.id;
  await db.connect();
  const teachRequest = await TeachRequest.findById(teachRequestId).exec();
  teachRequest.hasMeeting = true;
  await teachRequest.save();
  res.status(200).send();
};
