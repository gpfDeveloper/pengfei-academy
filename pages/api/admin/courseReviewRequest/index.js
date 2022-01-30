import nc from 'next-connect';

import { isLogin, isAdmin } from 'middleware/auth';
import { getCourseReviewReqs } from 'controllers/admin';

const handler = nc();

handler.get(isLogin, isAdmin, getCourseReviewReqs);

export default handler;
