import jwt from 'jsonwebtoken';

export const isLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    // Bearer xxx => xxx
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).json({ message: 'Token is not valid' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Token is not suppiled' });
  }
};

export const isInstructor = async (req, res, next) => {
  if (req.user.roles.indexOf('Instructor') !== -1) {
    next();
  } else {
    res.status(401).json({ message: 'Not instructor' });
  }
};
