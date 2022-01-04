import User from 'models/User';
import db from 'utils/db';

export const getUsers = async (req, res) => {
  await db.connect();
  const users = await User.find();
  res.status(200).json(users.map((user) => user.toObject({ getters: true })));
};
