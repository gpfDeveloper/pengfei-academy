import nc from 'next-connect';

import { isLogin } from 'middleware/auth';

const handler = nc();

handler.get(isLogin, (req, res) => {
  return res.status(200).json({ paypalClientId: process.env.PAYPAL_CLIENT_ID });
});

export default handler;
