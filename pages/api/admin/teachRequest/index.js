import nc from 'next-connect';

import { isLogin, isAdmin } from 'middleware/auth';
import { getTeachRequests } from 'controllers/admin';

const handler = nc();

handler.get(isLogin, isAdmin, getTeachRequests);

export default handler;
