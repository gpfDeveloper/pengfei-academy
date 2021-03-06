import nc from 'next-connect';

import { isLogin, isAdmin } from 'middleware/auth';
import { approveTeachRequest } from 'controllers/admin';

const handler = nc();

handler.get(isLogin, isAdmin, approveTeachRequest);

export default handler;
