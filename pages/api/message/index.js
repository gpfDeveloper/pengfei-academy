import nc from 'next-connect';

import { sendMessage } from 'controllers/message';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.post(isLogin, sendMessage);

export default handler;
