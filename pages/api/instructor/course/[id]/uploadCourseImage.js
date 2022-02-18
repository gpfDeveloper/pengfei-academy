import nc from 'next-connect';
import multer from 'multer';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { uploadCourseImage } from 'controllers/instructor';

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
  upload.single('image'),
  uploadCourseImage
);

export default handler;
