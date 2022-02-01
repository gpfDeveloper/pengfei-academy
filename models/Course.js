import mongoose from 'mongoose';
import { COURSE_LANGUAGE, COURSE_REVIEW_STATUS } from 'utils/constants';
import { getAllCourseCategories, getAllCourseSubcategories } from 'utils';
const { reviewing, approved, needsFixes } = COURSE_REVIEW_STATUS;

const courseLanguages = Object.keys(COURSE_LANGUAGE);
const courseCategories = getAllCourseCategories();
const courseSubcategories = getAllCourseSubcategories();

const CourseSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: { type: String, required: true, trim: true, maxlength: 60 },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedCourse: {
      type: mongoose.Types.ObjectId,
      ref: 'PublishedCourse',
    },
    reviewStatus: {
      type: String,
      enum: [reviewing, approved, needsFixes],
    },
    reviewReq: {
      type: mongoose.Types.ObjectId,
      ref: 'CourseReviewRequest',
    },
    subtitle: { type: String, trim: true, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 6000 },
    language: {
      type: String,
      required: true,
      default: 'English',
      enum: [...courseLanguages],
    },
    price: { type: Number, max: 1000, min: 0 },
    category: { type: String, enum: [...courseCategories] },
    subcategory: { type: String, enum: [...courseSubcategories] },
    welcomeMsg: { type: String, trim: true, maxlength: 1000 },
    congratulationMsg: { type: String, trim: true, maxlength: 1000 },
    learningObjectives: [{ type: String, trim: true, maxlength: 160 }],
    prerequisites: [{ type: String, trim: true, maxlength: 160 }],
    courseForWho: [{ type: String, trim: true, maxlength: 160 }],
    sections: [{ type: mongoose.Types.ObjectId, ref: 'CourseSection' }],
  },
  { timestamps: true }
);

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);
export default Course;
