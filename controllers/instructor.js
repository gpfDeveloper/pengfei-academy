import User from 'models/User';
import Course from 'models/Course';
import CourseSection from 'models/CourseSection';
import Lecture from 'models/Lecture';
import db from 'utils/db';
import { isValidCategory } from 'utils';
import mongoose from 'mongoose';

export const createCourse = async (req, res) => {
  const userId = req.user.id;
  const { title } = req.body;
  if (!title) return res.status(422).json({ message: 'Title not provided.' });
  await db.connect();
  const user = await User.findById(userId);
  if (user) {
    const course = new Course({ title, author: user._id });

    //init default new course section and new course lecture
    const courseSection = new CourseSection({
      course: course._id,
      title: 'Introduction',
    });
    const lecture = new Lecture({
      course: course._id,
      section: courseSection._id,
      title: 'Introduction',
    });
    course.sections = [courseSection._id];
    courseSection.lectures = [lecture._id];

    const session = await mongoose.startSession();
    session.startTransaction();
    await course.save({ session });
    await courseSection.save({ session });
    await lecture.save({ session });
    await session.commitTransaction();

    res.status(200).json({ course: course.toObject({ getters: true }) });
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};

export const getMyCourses = async (req, res) => {
  const userId = req.user.id;
  await db.connect();
  const user = await User.findById(userId);
  if (user) {
    const courses = await Course.find({ author: user._id }).sort({
      updatedAt: 'desc',
    });
    return res
      .status(200)
      .json({ courses: courses.map((c) => c.toObject({ getters: true })) });
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};

/* 
return data format:
{
  title: 'Learn Javascript',
  ..., 
  sections:
  [
    {
      title:'Introduction',
      ...,
      lectures:
      [
        {
          title:'Introduction',
          ...
        },
        ...
      ]
    },
    ...
  ]
} 
*/
export const getMyCourse = async (req, res) => {
  const course = req.course;

  //fetch all course sections and course lectures;
  if (course) {
    //{[id1]:2,[id2]:0,[id3]:1}
    const sectionIdIdxMap = {};

    const sections = await CourseSection.find({ course: course._id });
    const lectures = await Lecture.find({ course: course._id });

    for (let i = 0; i < course.sections.length; i++) {
      const sectionId = course.sections[i].toString();

      //cast from ObjectId to string
      course.sections[i] = sectionId;

      sectionIdIdxMap[sectionId] = i;
    }

    //{[id1]:{lecture1},[id2]:{lecture2}}
    const lectureIdMap = {};

    for (const _lecture of lectures) {
      const lecture = _lecture.toObject({ getters: true });
      lectureIdMap[lecture.id] = lecture;
    }

    const ret = course.toObject({ getters: true });
    for (const _section of sections) {
      const section = _section.toObject({ getters: true });
      const sectionIdx = sectionIdIdxMap[section.id];
      ret.sections[sectionIdx] = section;
      for (let i = 0; i < section.lectures.length; i++) {
        const lectureId = section.lectures[i].toString();
        section.lectures[i] = lectureIdMap[lectureId];
      }
    }
    return res.status(200).json({ course: ret });
  } else {
    return res.status(404).json({ message: 'Course not found.' });
  }
};

//couse title, subtile, description, language, category, subcategory
export const updateCourseBasicInfo = async (req, res) => {
  const course = req.course;
  const { title, subtitle, description, language, category, subcategory } =
    req.body;
  if (!isValidCategory(category, subcategory)) {
    res.status(422).json({
      message: `Invalid category ${category} or subcategory ${subcategory}`,
    });
  }
  course.category = category;
  course.subcategory = subcategory;
  course.title = title;
  course.subtitle = subtitle;
  course.description = description;
  course.language = language;
  await course.save();
  res.status(200).send();
};

export const updateCourseMsg = async (req, res) => {
  const course = req.course;
  const { welcomeMsg, congratulationMsg } = req.body;
  course.welcomeMsg = welcomeMsg;
  course.congratulationMsg = congratulationMsg;
  await course.save();
  res.status(200).send();
};

export const updateCourseLearningObjectives = async (req, res) => {
  const course = req.course;
  const { learningObjectives } = req.body;
  course.learningObjectives = learningObjectives;
  await course.save();
  res.status(200).send();
};

export const updateCoursePrerequisites = async (req, res) => {
  const course = req.course;
  const { prerequisites } = req.body;
  course.prerequisites = prerequisites;
  await course.save();
  res.status(200).send();
};

export const updateCourseForWho = async (req, res) => {
  const course = req.course;
  const { courseForWho } = req.body;
  course.courseForWho = courseForWho;
  await course.save();
  res.status(200).send();
};

export const updateCoursePrice = async (req, res) => {
  const course = req.course;
  const { price } = req.body;
  course.price = +price;
  await course.save();
  res.status(200).send();
};

//to do courses cannot be deleted after students have enrolled.
export const deleteCourse = async (req, res) => {
  const course = req.course;
  const session = await mongoose.startSession();
  session.startTransaction();
  await CourseSection.deleteMany({ course: course._id }, { session: session });
  await Lecture.deleteMany({ course: course._id }, { session: session });
  await Course.findByIdAndDelete(course._id, { session: session });
  await session.commitTransaction();
  res.status(200).send();
};

export const createCourseSection = async (req, res) => {
  const course = req.course;
  const { title } = req.body;
  if (!title) return res.status(422).json({ message: 'Title not provided.' });
  await db.connect();

  const courseSection = new CourseSection({
    course: course._id,
    title,
  });
  course.sections.push(courseSection._id);

  const session = await mongoose.startSession();
  session.startTransaction();
  await courseSection.save({ session });
  await course.save({ session });
  await session.commitTransaction();

  res
    .status(200)
    .json({ courseSection: courseSection.toObject({ getters: true }) });
};

export const deleteCourseSection = async (req, res) => {
  const course = req.course;
  const { sectionId } = req.query;
  if (!sectionId)
    return res.status(422).json({ message: 'sectionId not provided.' });
  await db.connect();

  const session = await mongoose.startSession();
  session.startTransaction();
  await CourseSection.findByIdAndDelete(sectionId, { session });
  course.sections = course.sections.filter((id) => id.toString() !== sectionId);
  await Lecture.deleteMany({ section: sectionId }, { session });
  await course.save({ session });
  await session.commitTransaction();

  res.status(200).send();
};

export const editCourseSection = async (req, res) => {
  const { sectionId } = req.query;
  const { title } = req.body;
  if (!sectionId || !title)
    return res
      .status(422)
      .json({ message: 'Section Id or title not provided.' });

  await db.connect();
  const courseSection = await CourseSection.findById(sectionId);
  if (courseSection) {
    courseSection.title = title;
    await courseSection.save();
    res.status(200).send();
  } else {
    res.status(404).json({ message: 'Course section not found.' });
  }
};

export const createLecture = async (req, res) => {
  const { id: courseId, sectionId } = req.query;
  const { title } = req.body;
  if (!title || !sectionId || !courseId)
    return res
      .status(422)
      .json({ message: 'Title or sectionId or courseId not provided.' });

  await db.connect();

  const courseSection = await CourseSection.findById(sectionId);
  if (!courseSection) {
    return res.status(404).json({ message: 'Course section not found' });
  }

  const lecture = new Lecture({ title, course: courseId, section: sectionId });
  courseSection.lectures.push(lecture._id);

  const session = await mongoose.startSession();
  session.startTransaction();

  await courseSection.save({ session });
  await lecture.save({ session });
  await session.commitTransaction();

  res.status(200).json({ lecture: lecture.toObject({ getters: true }) });
};

export const deleteLecture = async (req, res) => {
  const { sectionId, lectureId } = req.query;
  if (!sectionId || !lectureId)
    return res
      .status(422)
      .json({ message: 'sectionId or lectureId not provided.' });

  await db.connect();
  await Lecture.findByIdAndDelete(lectureId);
  const courseSection = await CourseSection.findById(sectionId);
  if (courseSection) {
    courseSection.lectures = courseSection.lectures.filter(
      (id) => id.toString() !== lectureId
    );
    await courseSection.save();
    res.status(200).send();
  } else {
    return res.status(404).json({ message: 'Course section not found.' });
  }
};

export const editLecture = async (req, res) => {
  const { lectureId } = req.query;
  const { title, contentType, article } = req.body;
  if (!lectureId || !title)
    return res
      .status(422)
      .json({ message: 'Lecture Id or title not provided.' });

  await db.connect();
  const lecture = await Lecture.findById(lectureId);
  if (lecture) {
    lecture.title = title;
    if (contentType) {
      lecture.contentType = contentType;
    }
    if (article) {
      lecture.article = article;
    }
    await lecture.save();
  } else {
    return res.status(404).json({ message: 'Lecture not found.' });
  }
};
