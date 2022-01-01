import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from 'models/User';
import db from 'utils/db';
import { signToken } from 'utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const name = req.body.name;
  const email = req.body.email;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(422).json({ message: 'Email has been used already.' });
  }
  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(req.body.password),
    role: ['Subscriber', 'Instructor', 'Administrators'],
  });
  const user = await newUser.save();

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

export default handler;
