import nc from 'next-connect';

import { getWishlistCourseItems, addToWishlist } from 'controllers/user';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.get(isLogin, getWishlistCourseItems);
handler.post(isLogin, addToWishlist);

export default handler;
