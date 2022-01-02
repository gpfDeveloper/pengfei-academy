import nc from 'next-connect';

import { login } from 'controllers/user';

const handler = nc();

handler.post(login);

export default handler;
