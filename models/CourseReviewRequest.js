import mongoose from 'mongoose';
import { COURSE_REVIEW_STATUS } from 'utils/constants';

const { reviewing, approved, needsFixes } = COURSE_REVIEW_STATUS;

const CourseReviewRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    course: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'Course',
    },
    courseTitle: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: reviewing,
      enum: [reviewing, approved, needsFixes],
    },
    adminComment: {
      type: String,
      maxlength: 6000,
      default: '',
    },
  },
  { timestamps: true }
);

const CourseReviewRequest =
  mongoose.models.CourseReviewRequest ||
  mongoose.model('CourseReviewRequest', CourseReviewRequestSchema);
export default CourseReviewRequest;
