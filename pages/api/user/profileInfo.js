import nc from 'next-connect';

import { updateProfileInfo } from 'controllers/user';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.put(isLogin, updateProfileInfo);

export default handler;
