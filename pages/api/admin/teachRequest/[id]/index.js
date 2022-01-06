import nc from 'next-connect';

import { isLogin, isAdmin } from 'middleware/auth';
import { updateComment } from 'controllers/admin';

const handler = nc();

handler.put(isLogin, isAdmin, updateComment);

export default handler;
