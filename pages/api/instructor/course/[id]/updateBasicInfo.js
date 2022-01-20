import nc from 'next-connect';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { updateBasicInfo } from 'controllers/instructor';

const handler = nc();

handler.put(isLogin, isInstructor, canViewEditCourse, updateBasicInfo);

export default handler;
