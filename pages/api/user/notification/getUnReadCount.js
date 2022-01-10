import nc from 'next-connect';

import { getUnReadNotificationCount } from 'controllers/user';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.get(isLogin, getUnReadNotificationCount);

export default handler;
