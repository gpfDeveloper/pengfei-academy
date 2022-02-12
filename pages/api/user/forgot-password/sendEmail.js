import nc from 'next-connect';

import { sendResetPasswordEmail } from 'controllers/user';

const handler = nc();

handler.post(sendResetPasswordEmail);

export default handler;
