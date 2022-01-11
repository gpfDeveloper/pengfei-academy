import nc from 'next-connect';

import { getNotifications } from 'controllers/notification';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.get(isLogin, getNotifications);

export default handler;
