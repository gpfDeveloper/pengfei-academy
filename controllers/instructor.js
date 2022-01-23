import User from 'models/User';
import Course from 'models/Course';
import CourseSection from 'models/CourseSection';
import Lecture from 'models/Lecture';
import db from 'utils/db';
import { isValidCategory } from 'utils';

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

    await course.save();
    await courseSection.save();
    await lecture.save();

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
  await Course.findByIdAndDelete(course._id);
  res.status(200).send();
};
