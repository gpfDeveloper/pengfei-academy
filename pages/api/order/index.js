import nc from 'next-connect';

import { createOrderAndBatchEnrollment } from 'controllers/order';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.post(isLogin, createOrderAndBatchEnrollment);

export default handler;
