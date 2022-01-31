import nc from 'next-connect';

import { isLogin, isAdmin } from 'middleware/auth';
import { updateCourseReviewReqNeedFixes } from 'controllers/admin';

const handler = nc();

handler.get(isLogin, isAdmin, updateCourseReviewReqNeedFixes);

export default handler;
