import User from 'models/User';
import Course from 'models/Course';
import db from 'utils/db';

export const createCourse = async (req, res) => {
  const userId = req.user.id;
  const { title } = req.body;
  if (!title) return res.status(422).json({ message: 'Title not provided.' });
  await db.connect();
  const user = await User.findById(userId);
  if (user) {
    const course = new Course({ title, author: user._id });
    await course.save();
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

export const getMyCourse = async (req, res) => {
  const course = req.course;
  return res.status(200).json({ course: course.toObject({ getters: true }) });
};

//couse title, subtile, description, language, category, subcategory
export const updateBasicInfo = async (req, res) => {
  const course = req.course;
  const { title, subtitle, description, language, category, subcategory } =
    req.body;
  console.log(course);
  console.log(title, subtitle, description, language, category, subcategory);
  res.status(200).send();
};
