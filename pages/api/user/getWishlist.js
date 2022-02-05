import nc from 'next-connect';

import { getWishlistCourseItems } from 'controllers/user';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.get(isLogin, getWishlistCourseItems);

export default handler;
