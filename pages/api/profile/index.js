import nc from 'next-connect';

import { updateProfile, getProfile } from 'controllers/profile';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.get(isLogin, getProfile);
handler.put(isLogin, updateProfile);

export default handler;
