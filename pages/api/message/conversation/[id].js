import nc from 'next-connect';

import { getMsgsByConversation } from 'controllers/message';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.get(isLogin, getMsgsByConversation);

export default handler;
