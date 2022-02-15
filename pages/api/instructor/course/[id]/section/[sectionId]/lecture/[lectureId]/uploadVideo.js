import nc from 'next-connect';
import multer from 'multer';
import { Readable } from 'stream';

import { isLogin, isInstructor, canViewEditCourse } from 'middleware/auth';
import { uploadLectureVideo } from 'controllers/instructor';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc();

const upload = multer();

// const uploadBuffer = (buffer) => {
//   return new Promise((resolve, reject) => {
//     const writeStream = cloudinary.uploader.upload_stream((err, result) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve(result);
//     });
//     const readStream = new Readable({
//       read() {
//         this.push(buffer);
//         this.push(null);
//       },
//     });
//     readStream.pipe(writeStream);
//   });
// };

handler.put(
  isLogin,
  isInstructor,
  canViewEditCourse,
  upload.single('lectureVideo'),
  uploadLectureVideo
);

export default handler;
