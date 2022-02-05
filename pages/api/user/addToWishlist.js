import nc from 'next-connect';

import { addToWishlist } from 'controllers/user';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.post(isLogin, addToWishlist);

export default handler;
