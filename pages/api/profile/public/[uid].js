import nc from 'next-connect';

import { getPublicProfile } from 'controllers/profile';

const handler = nc();

handler.get(getPublicProfile);

export default handler;
