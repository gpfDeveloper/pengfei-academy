import nc from 'next-connect';

import { clearUnReadNotificationCount } from 'controllers/notification';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.get(isLogin, clearUnReadNotificationCount);

export default handler;
