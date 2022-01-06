import nc from 'next-connect';

import { sendRequest } from 'controllers/teaching';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.post(isLogin, sendRequest);

export default handler;
