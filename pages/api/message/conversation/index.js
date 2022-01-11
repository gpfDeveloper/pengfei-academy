import nc from 'next-connect';

import { getConversations } from 'controllers/message';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.get(isLogin, getConversations);

export default handler;
