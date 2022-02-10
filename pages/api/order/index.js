import nc from 'next-connect';

import { createOrderAndBatchEnrollment, getAllOrders } from 'controllers/order';
import { isLogin, isAdmin } from 'middleware/auth';

const handler = nc();

handler.post(isLogin, createOrderAndBatchEnrollment);

handler.get(isLogin, isAdmin, getAllOrders);

export default handler;
