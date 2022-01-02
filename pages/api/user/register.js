import nc from 'next-connect';

import { register } from 'controllers/user';

const handler = nc();

handler.post(register);

export default handler;
