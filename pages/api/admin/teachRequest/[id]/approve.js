import nc from 'next-connect';

import { isLogin, isAdmin } from 'middleware/auth';
import { approveRequest } from 'controllers/admin';

const handler = nc();

handler.get(isLogin, isAdmin, approveRequest);

export default handler;
