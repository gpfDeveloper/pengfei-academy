import mongoose from 'mongoose';

const CourseSectionSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Course',
      index: true,
    },
    publishedCourseSection: {
      type: mongoose.Types.ObjectId,
      ref: 'CourseSection',
      index: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 80 },
    lectures: [{ type: mongoose.Types.ObjectId, ref: 'Lecture' }],
  },
  { timestamps: true }
);

const CourseSection =
  mongoose.models.CourseSection ||
  mongoose.model('CourseSection', CourseSectionSchema);
export default CourseSection;
