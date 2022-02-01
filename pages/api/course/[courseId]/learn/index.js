import nc from 'next-connect';

import { isLogin, canLearnPublishedCourse } from 'middleware/auth';
import { getPublishedCourseLearn } from 'controllers/publishedCourse';

const handler = nc();

handler.get(isLogin, canLearnPublishedCourse, getPublishedCourseLearn);

export default handler;
