import nc from 'next-connect';

import { getMsgsByConversation } from 'controllers/message';
import { isLogin, canViewConversation } from 'middleware/auth';

const handler = nc();

handler.get(isLogin, canViewConversation, getMsgsByConversation);

export default handler;
