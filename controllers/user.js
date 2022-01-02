import bcrypt from 'bcryptjs';
import User from 'models/User';
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
    role: ['Subscriber'],
  });
  const user = await newUser.save();
  const token = signToken(user);
  res.send({
    token,
    id: user._id,
    name: user.name,
  });
};

export const login = async (req, res) => {
  await db.connect();
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      id: user._id,
      name: user.name,
    });
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
  }
};
