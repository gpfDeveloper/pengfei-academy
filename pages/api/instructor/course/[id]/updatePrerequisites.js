import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { updateCoursePrerequisites } from 'controllers/instructor';

const handler = nc();

handler.put(
  isLogin,
  isInstructor,
  canViewEditCourse,
  updateCoursePrerequisites
);

export default handler;
