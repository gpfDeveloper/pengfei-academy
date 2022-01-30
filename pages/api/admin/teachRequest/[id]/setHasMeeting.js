import nc from 'next-connect';

import { isLogin, isAdmin } from 'middleware/auth';
import { setTeachReqHasMeeting } from 'controllers/admin';

const handler = nc();

handler.get(isLogin, isAdmin, setTeachReqHasMeeting);

export default handler;
