import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { dragDropCourseSection } from 'controllers/instructor';

const handler = nc();

handler.put(isLogin, isInstructor, canViewEditCourse, dragDropCourseSection);

export default handler;
