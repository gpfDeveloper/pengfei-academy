import nc from 'next-connect';

import { isLogin, isAdmin } from 'middleware/auth';
import { updateCourseReviewReqComment } from 'controllers/admin';

const handler = nc();

handler.put(isLogin, isAdmin, updateCourseReviewReqComment);

export default handler;
