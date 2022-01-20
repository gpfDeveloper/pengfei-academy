import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { updateCourseMsg } from 'controllers/instructor';

const handler = nc();

handler.put(isLogin, isInstructor, canViewEditCourse, updateCourseMsg);

export default handler;
