import nc from 'next-connect';

import { getSignedCoursePromoVideoUrl } from 'controllers/publishedCourse';

const handler = nc();

handler.post(getSignedCoursePromoVideoUrl);

export default handler;
