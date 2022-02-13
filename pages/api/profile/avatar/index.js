import nc from 'next-connect';

import { updateProfileAvatar } from 'controllers/profile';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.put(isLogin, updateProfileAvatar);

export default handler;
