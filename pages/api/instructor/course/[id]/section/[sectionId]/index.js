import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { deleteCourseSection, editCourseSection } from 'controllers/instructor';

const handler = nc();

handler.delete(isLogin, isInstructor, canViewEditCourse, deleteCourseSection);
handler.put(isLogin, isInstructor, canViewEditCourse, editCourseSection);

export default handler;
