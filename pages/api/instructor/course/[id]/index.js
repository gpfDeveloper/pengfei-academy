import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { getMyCourse } from 'controllers/instructor';

const handler = nc();

handler.get(isLogin, isInstructor, canViewEditCourse, getMyCourse);

export default handler;
