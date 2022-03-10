import mongoose from 'mongoose';
import { COURSE_LANGUAGE } from 'utils/constants';
import { getAllCourseCategories, getAllCourseSubcategories } from 'utils';

const courseLanguages = Object.keys(COURSE_LANGUAGE);
const courseCategories = getAllCourseCategories();
const courseSubcategories = getAllCourseSubcategories();

const PublishedCourseSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'Course',
    },
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
      index: true,
      ref: 'User',
    },
    authorUpdatedAt: {
      type: Date,
      default: Date.now(),
    },
    title: { type: String, required: true, trim: true, maxlength: 60 },
    subtitle: { type: String, trim: true, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 6000 },
    language: {
      type: String,
      required: true,
      default: 'English',
      enum: [...courseLanguages],
    },
    priority: {
      type: Number,
      default: 0,
    },
    price: { type: Number, max: 1000, min: 0 },
    category: { type: String, enum: [...courseCategories] },
    subcategory: { type: String, enum: [...courseSubcategories] },
    welcomeMsg: { type: String, trim: true, maxlength: 1000 },
    learningObjectives: [{ type: String, trim: true, maxlength: 160 }],
    prerequisites: [{ type: String, trim: true, maxlength: 160 }],
    courseForWho: [{ type: String, trim: true, maxlength: 160 }],
    sections: [
      { type: mongoose.Types.ObjectId, ref: 'PublishedCourseSection' },
    ],
  },
  { timestamps: true }
);

const PublishedCourse =
  mongoose.models.PublishedCourse ||
  mongoose.model('PublishedCourse', PublishedCourseSchema);
export default PublishedCourse;
