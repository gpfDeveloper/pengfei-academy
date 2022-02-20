import nc from 'next-connect';

import { isLogin, canLearnOrPreviewLectureVideo } from 'middleware/auth';
import { getSignedLectureVideoUrl } from 'controllers/publishedCourse';

const handler = nc();

handler.post(isLogin, canLearnOrPreviewLectureVideo, getSignedLectureVideoUrl);

export default handler;
