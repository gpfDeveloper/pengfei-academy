import mongoose from 'mongoose';
import { COURSE_CONTENT_TYPE } from 'utils/constants';
const contentTypes = Object.keys(COURSE_CONTENT_TYPE);

const PublishedLectureSchema = new mongoose.Schema(
  {
    lecture: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'Lecture',
    },
    course: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'PublishedCourse',
    },
    section: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'PublishedCourseSection',
    },
    title: { type: String, required: true, trim: true, maxlength: 80 },
    contentType: {
      type: String,
      enum: [...contentTypes],
    },
    article: { type: String, trim: true, maxlength: 6000 },
    //todo video
    // video: {},
  },
  { timestamps: true }
);

const PublishedLecture =
  mongoose.models.PublishedLecture ||
  mongoose.model('PublishedLecture', PublishedLectureSchema);
export default PublishedLecture;
