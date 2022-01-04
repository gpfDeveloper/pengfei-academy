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
    role: ['Student'],
  });
  const user = await newUser.save();
  const token = signToken(user);
  res.send({
    token,
    name: user.name,
    email: user.email,
    role: user.role,
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
      role: user.role,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
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
      res.status(200).send();
    } catch (err) {
      res.status(422).json({ message: 'Email already used.' });
    }
    res.status(200).send();
  } else {
    res.status(401).json({ message: 'Incorrenct current password.' });
  }
};
