import nc from 'next-connect';

import { isLogin, isAdmin } from 'middleware/auth';
import { getUsers } from 'controllers/admin';

const handler = nc();

handler.get(isLogin, isAdmin, getUsers);

export default handler;
