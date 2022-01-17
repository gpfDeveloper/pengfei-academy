import nc from 'next-connect';

import { isLogin, isInstructor } from 'middleware/auth';
import { createCourse } from 'controllers/instructor';

const handler = nc();

handler.post(isLogin, isInstructor, createCourse);

export default handler;
