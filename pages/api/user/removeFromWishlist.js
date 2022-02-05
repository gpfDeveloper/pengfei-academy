import nc from 'next-connect';

import { removeFromWishlist } from 'controllers/user';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.post(isLogin, removeFromWishlist);

export default handler;
