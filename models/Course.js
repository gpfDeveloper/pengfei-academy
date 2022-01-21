import mongoose from 'mongoose';
import { CREATE_COURSE_STATUS, COURSE_LANGUAGE } from 'utils/constants';
import { getAllCourseCategories } from 'utils';
import { getAllCourseSubcategories } from 'utils';
const { draft, review, published } = CREATE_COURSE_STATUS;

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
    status: {
      type: Number,
      required: true,
      default: draft,
      enum: [draft, review, published],
    },
    subtitle: { type: String, trim: true, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 6000 },
    language: {
      type: String,
      required: true,
      default: 'English',
      enum: [...courseLanguages],
    },
    category: { type: String, enum: [...courseCategories] },
    subcategory: { type: String, enum: [...courseSubcategories] },
    welcomeMsg: { type: String, trim: true, maxlength: 1000 },
    congratulationMsg: { type: String, trim: true, maxlength: 1000 },
    learningObjectives: [{ type: String, trim: true, maxlength: 160 }],
  },
  { timestamps: true }
);

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);
export default Course;
