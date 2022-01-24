import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { deleteCourseSection } from 'controllers/instructor';

const handler = nc();

handler.delete(isLogin, isInstructor, canViewEditCourse, deleteCourseSection);

export default handler;
