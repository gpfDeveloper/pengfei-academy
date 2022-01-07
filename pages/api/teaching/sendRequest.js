import nc from 'next-connect';

import { sendRequest, fetchRequest } from 'controllers/teaching';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.post(isLogin, sendRequest);
handler.get(isLogin, fetchRequest);

export default handler;
