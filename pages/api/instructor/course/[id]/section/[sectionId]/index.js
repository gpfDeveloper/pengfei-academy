import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import {
  deleteCourseSection,
  editCourseSectionTitle,
} from 'controllers/instructor';

const handler = nc();

handler.delete(isLogin, isInstructor, canViewEditCourse, deleteCourseSection);
handler.put(isLogin, isInstructor, canViewEditCourse, editCourseSectionTitle);

export default handler;
