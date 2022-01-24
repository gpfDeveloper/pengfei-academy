import nc from 'next-connect';

import { isLogin, isInstructor } from 'middleware/auth';
import { getMyCourses, createCourse } from 'controllers/instructor';

const handler = nc();

handler.get(isLogin, isInstructor, getMyCourses);
handler.post(isLogin, isInstructor, createCourse);

export default handler;
