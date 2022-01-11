import nc from 'next-connect';

import { deleteNotificationItem } from 'controllers/notification';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.delete(isLogin, deleteNotificationItem);

export default handler;
