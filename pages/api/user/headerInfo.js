import nc from 'next-connect';

import { getHeaderUserInfo } from 'controllers/user';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.get(isLogin, getHeaderUserInfo);

export default handler;
