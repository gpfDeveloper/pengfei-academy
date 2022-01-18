import nc from 'next-connect';

import { isLogin, isInstructor } from 'middleware/auth';
import { getMyCourses } from 'controllers/instructor';

const handler = nc();

handler.get(isLogin, isInstructor, getMyCourses);

export default handler;
