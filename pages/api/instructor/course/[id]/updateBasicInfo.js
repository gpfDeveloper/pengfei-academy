import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { updateCourseBasicInfo } from 'controllers/instructor';

const handler = nc();

handler.put(isLogin, isInstructor, canViewEditCourse, updateCourseBasicInfo);

export default handler;
