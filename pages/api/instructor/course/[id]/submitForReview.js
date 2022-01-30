import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { submitCourseForReview } from 'controllers/instructor';

const handler = nc();

handler.get(isLogin, isInstructor, canViewEditCourse, submitCourseForReview);

export default handler;
