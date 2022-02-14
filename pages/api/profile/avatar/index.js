import nc from 'next-connect';

import { updateProfileAvatar, getProfileAvatarUrl } from 'controllers/profile';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.get(isLogin, getProfileAvatarUrl);
handler.put(isLogin, updateProfileAvatar);

export default handler;
