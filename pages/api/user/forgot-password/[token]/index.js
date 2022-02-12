import nc from 'next-connect';

import { resetPasswordFromEmail } from 'controllers/user';

const handler = nc();

handler.post(resetPasswordFromEmail);

export default handler;
