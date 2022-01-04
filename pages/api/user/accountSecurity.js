import nc from 'next-connect';

import { updateAccountSecurity } from 'controllers/user';
import { isLogin } from 'middleware/auth';

const handler = nc();

handler.put(isLogin, updateAccountSecurity);

export default handler;
