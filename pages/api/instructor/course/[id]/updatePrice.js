import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { updateCoursePrice } from 'controllers/instructor';

const handler = nc();

handler.put(isLogin, isInstructor, canViewEditCourse, updateCoursePrice);

export default handler;
