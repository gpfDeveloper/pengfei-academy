import nc from 'next-connect';

import { isLogin, isAdmin } from 'middleware/auth';
import { updateTeachReqComment } from 'controllers/admin';

const handler = nc();

handler.put(isLogin, isAdmin, updateTeachReqComment);

export default handler;
