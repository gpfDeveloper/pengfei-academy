import mongoose from 'mongoose';
import { COURSE_CONTENT_TYPE } from 'utils/constants';
const contentTypes = Object.keys(COURSE_CONTENT_TYPE);

const LectureSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Types.ObjectId,
      required: true,
      index: true,
      ref: 'Course',
    },
    section: {
      type: mongoose.Types.ObjectId,
      required: true,
      index: true,
      ref: 'CourseSection',
    },
    publishedLecture: {
      type: mongoose.Types.ObjectId,
      index: true,
      ref: 'PublisedLecture',
    },
    title: { type: String, required: true, trim: true, maxlength: 80 },
    contentType: {
      type: String,
      enum: [...contentTypes],
    },
    article: { type: String, trim: true, maxlength: 6000 },
    video: {
      type: mongoose.Types.ObjectId,
      ref: 'VideoLecture',
    },
  },
  { timestamps: true }
);

const Lecture =
  mongoose.models.Lecture || mongoose.model('Lecture', LectureSchema);
export default Lecture;
