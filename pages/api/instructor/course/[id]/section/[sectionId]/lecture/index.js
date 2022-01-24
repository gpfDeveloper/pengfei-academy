import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { createLecture } from 'controllers/instructor';

const handler = nc();

handler.post(isLogin, isInstructor, canViewEditCourse, createLecture);

export default handler;
