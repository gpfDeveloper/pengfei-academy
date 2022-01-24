import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { deleteLecture, editLecture } from 'controllers/instructor';

const handler = nc();

handler.delete(isLogin, isInstructor, canViewEditCourse, deleteLecture);
handler.put(isLogin, isInstructor, canViewEditCourse, editLecture);

export default handler;
