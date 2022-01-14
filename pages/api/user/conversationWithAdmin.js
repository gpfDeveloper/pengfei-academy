import nc from 'next-connect';

import { getConversationWithAdminId } from 'controllers/user';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.get(isLogin, getConversationWithAdminId);

export default handler;
