import mongoose from 'mongoose';
import { CREATE_COURSE_STATUS } from 'utils/constants';
const { draft, review, approved, published } = CREATE_COURSE_STATUS;

const CourseSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: { type: String, required: true, trim: true, maxlength: 60 },
    status: {
      type: Number,
      required: true,
      default: draft,
      enum: [draft, review, approved, published],
    },
  },
  { timestamps: true }
);

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);
export default Course;
