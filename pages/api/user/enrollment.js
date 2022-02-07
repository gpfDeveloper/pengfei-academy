import nc from 'next-connect';

import { enrollment } from 'controllers/user';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.post(isLogin, enrollment);

export default handler;
