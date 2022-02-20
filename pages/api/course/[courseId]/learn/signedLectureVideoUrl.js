import nc from 'next-connect';

import { isLogin, canLearnPublishedCourse } from 'middleware/auth';
import { getSignedLectureVideoUrl } from 'controllers/publishedCourse';

const handler = nc();

handler.post(isLogin, canLearnPublishedCourse, getSignedLectureVideoUrl);

export default handler;
