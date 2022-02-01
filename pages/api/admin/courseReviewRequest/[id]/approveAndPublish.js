import nc from 'next-connect';

import { isLogin, isAdmin } from 'middleware/auth';
import { updateCourseReviewReqApproveAndPublish } from 'controllers/admin';

const handler = nc();

handler.get(isLogin, isAdmin, updateCourseReviewReqApproveAndPublish);

export default handler;
