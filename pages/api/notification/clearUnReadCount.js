import nc from 'next-connect';

import { clearUnReadNotificationCount } from 'controllers/user';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.get(isLogin, clearUnReadNotificationCount);

export default handler;
