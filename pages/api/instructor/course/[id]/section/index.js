import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { createCourseSection } from 'controllers/instructor';

const handler = nc();

handler.post(isLogin, isInstructor, canViewEditCourse, createCourseSection);

export default handler;
