import mongoose from 'mongoose';

const PublishedCourseSectionSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'PublishedCourse',
    },
    courseSection: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'CourseSection',
      unique: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 80 },
    lectures: [{ type: mongoose.Types.ObjectId, ref: 'PublishedLecture' }],
  },
  { timestamps: true }
);

const PublishedCourseSection =
  mongoose.models.PublishedCourseSection ||
  mongoose.model('PublishedCourseSection', PublishedCourseSectionSchema);
export default PublishedCourseSection;
