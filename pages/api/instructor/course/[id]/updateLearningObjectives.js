import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { updateCourseLearningObjectives } from 'controllers/instructor';

const handler = nc();

handler.put(
  isLogin,
  isInstructor,
  canViewEditCourse,
  updateCourseLearningObjectives
);

export default handler;
