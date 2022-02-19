import nc from 'next-connect';
import multer from 'multer';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { uploadCoursePromoVideo } from 'controllers/instructor';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc();

const upload = multer();

handler.put(
  isLogin,
  isInstructor,
  canViewEditCourse,
  upload.single('video'),
  uploadCoursePromoVideo
);

export default handler;
