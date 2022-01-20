import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { getMyCourse, deleteCourse } from 'controllers/instructor';

const handler = nc();

handler.get(isLogin, isInstructor, canViewEditCourse, getMyCourse);
handler.delete(isLogin, isInstructor, canViewEditCourse, deleteCourse);

export default handler;
