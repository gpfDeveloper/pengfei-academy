import mongoose from 'mongoose';
import { COURSE_CONTENT_TYPE } from 'utils/constants';
const contentTypes = Object.keys(COURSE_CONTENT_TYPE);

const LectureSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    section: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'CourseSection',
    },
    title: { type: String, required: true, trim: true, maxlength: 80 },
    contentType: {
      type: String,
      enum: [...contentTypes],
    },
    article: { type: String, trim: true, maxlength: 6000 },
    video: {},
  },
  { timestamps: true }
);

const Lecture =
  mongoose.models.Lecture || mongoose.model('Lecture', LectureSchema);
export default Lecture;
