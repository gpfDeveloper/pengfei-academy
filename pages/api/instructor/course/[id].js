import nc from 'next-connect';

import { isLogin, isInstructor, canViewDraftCourse } from 'middleware/auth';
import { getMyCourse } from 'controllers/instructor';

const handler = nc();

handler.get(isLogin, isInstructor, canViewDraftCourse, getMyCourse);

export default handler;
