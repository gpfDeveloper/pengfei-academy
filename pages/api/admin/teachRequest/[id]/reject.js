import nc from 'next-connect';

import { isLogin, isAdmin } from 'middleware/auth';
import { rejectTeachRequest } from 'controllers/admin';

const handler = nc();

handler.get(isLogin, isAdmin, rejectTeachRequest);

export default handler;
