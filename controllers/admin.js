import User from 'models/User';
import TeachRequest from 'models/TeachRequest';
import db from 'utils/db';

export const getUsers = async (req, res) => {
  await db.connect();
  const users = await User.find();
  res.status(200).json(users.map((user) => user.toObject({ getters: true })));
};

export const getTeachRequests = async (req, res) => {
  await db.connect();

  const teachRequests = await TeachRequest.find().populate('user');

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
  const role = 'Instructor';
  const idx = user.roles.indexOf(role);
  if (idx !== -1) {
    user.roles.splice(idx, 1);
  }
  teachRequest.status = 'reject';
  await teachRequest.save();
  await user.save();
  res.status(200).send();
};

export const approveRequest = async (req, res) => {
  const teachRequestId = req.query.id;
  await db.connect();
  const teachRequest = await TeachRequest.findById(teachRequestId).exec();
  const user = await User.findById(teachRequest.user);
  const role = 'Instructor';
  if (user.roles.indexOf(role) === -1) {
    user.roles.push(role);
  }
  teachRequest.status = 'approved';
  await teachRequest.save();
  await user.save();
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
