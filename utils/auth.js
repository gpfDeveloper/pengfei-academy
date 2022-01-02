import jwt from 'jsonwebtoken';

export const signToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};
