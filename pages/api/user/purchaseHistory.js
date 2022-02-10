import nc from 'next-connect';

import { getPurchaseHistory } from 'controllers/user';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.get(isLogin, getPurchaseHistory);

export default handler;
