import nc from 'next-connect';

import { isLogin, isAdmin } from 'middleware/auth';
import { rejectRequest } from 'controllers/admin';

const handler = nc();

handler.get(isLogin, isAdmin, rejectRequest);

export default handler;
