import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { dragDropLectureSameSection } from 'controllers/instructor';

const handler = nc();

handler.put(
  isLogin,
  isInstructor,
  canViewEditCourse,
  dragDropLectureSameSection
);

export default handler;
