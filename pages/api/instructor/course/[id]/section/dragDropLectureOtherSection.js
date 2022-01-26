import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { dragDropLectureOtherSection } from 'controllers/instructor';

const handler = nc();

handler.put(
  isLogin,
  isInstructor,
  canViewEditCourse,
  dragDropLectureOtherSection
);

export default handler;
