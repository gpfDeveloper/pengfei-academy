import nc from 'next-connect';

import { getLearningListCourseItems } from 'controllers/user';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.get(isLogin, getLearningListCourseItems);

export default handler;
