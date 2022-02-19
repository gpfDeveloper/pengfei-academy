import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { getCoursePromoVideoUrl } from 'controllers/instructor';

const handler = nc();

handler.get(isLogin, isInstructor, canViewEditCourse, getCoursePromoVideoUrl);

export default handler;
