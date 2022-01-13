import nc from 'next-connect';

import { clearUnReadMsgCount } from 'controllers/message';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.get(isLogin, clearUnReadMsgCount);

export default handler;
