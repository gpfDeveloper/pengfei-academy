import PublishedCourse from 'models/PublishedCourse';
import PublishedCourseSection from 'models/PublishedCourseSection';
import PublishedLecture from 'models/PublishedLecture';
import db from 'utils/db';

// export const getCourse = async (req, res) => {
//   const courseId = req.query.id;
//   if (!courseId) {
//     return res.status(422).json({ message: 'Course id not provide.' });
//   }
//   await db.connect();
//   const course = await PublishedCourse.findById(courseId);

//   //fetch all course sections and course lectures;
//   if (course) {
//     //{[id1]:2,[id2]:0,[id3]:1}
//     const sectionIdIdxMap = {};

//     const sections = await PublishedCourseSection.find({ course: course._id });
//     const lectures = await PublishedLecture.find({ course: course._id });

//     for (let i = 0; i < course.sections.length; i++) {
//       const sectionId = course.sections[i].toString();

//       //cast from ObjectId to string
//       course.sections[i] = sectionId;

//       sectionIdIdxMap[sectionId] = i;
//     }

//     //{[id1]:{lecture1},[id2]:{lecture2}}
//     const lectureIdMap = {};

//     for (const _lecture of lectures) {
//       const lecture = _lecture.toObject({ getters: true });
//       lectureIdMap[lecture.id] = lecture;
//     }

//     const ret = course.toObject({ getters: true });
//     for (const _section of sections) {
//       const section = _section.toObject({ getters: true });
//       const sectionIdx = sectionIdIdxMap[section.id];
//       ret.sections[sectionIdx] = section;
//       for (let i = 0; i < section.lectures.length; i++) {
//         const lectureId = section.lectures[i].toString();
//         section.lectures[i] = lectureIdMap[lectureId];
//       }
//     }
//     return res.status(200).json({ course: ret });
//   } else {
//     return res.status(404).json({ message: 'Course not found.' });
//   }
// };

export const getPublishedCourseServer = async (courseId) => {
  await db.connect();
  const course = await PublishedCourse.findById(courseId);

  //fetch all course sections and course lectures;
  if (course) {
    //{[id1]:2,[id2]:0,[id3]:1}
    const sectionIdIdxMap = {};

    const sections = await PublishedCourseSection.find({ course: course._id });
    const lectures = await PublishedLecture.find({ course: course._id });

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
      lecture._id = lecture._id.toString();
      lecture.section = null;
      lecture.course = null;
      lecture.lecture = null;
      lecture.createdAt = null;
      lecture.updatedAt = null;
      lectureIdMap[lecture.id] = lecture;
    }

    const ret = course.toObject({ getters: true });
    for (const _section of sections) {
      const section = _section.toObject({ getters: true });
      section._id = section._id.toString();
      section.course = null;
      section.courseSection = null;
      section.createdAt = null;
      section.updatedAt = null;
      const sectionIdx = sectionIdIdxMap[section.id];
      ret.sections[sectionIdx] = section;
      for (let i = 0; i < section.lectures.length; i++) {
        const lectureId = section.lectures[i].toString();
        section.lectures[i] = lectureIdMap[lectureId];
      }
    }
    ret._id = ret._id.toString();
    ret.author = ret.author.toString();
    ret.course = null;
    ret.createdAt = null;
    ret.updatedAt = null;
    return ret;
  } else {
    throw new Error('Course not found.');
  }
};

export const getPublishedCourseLearn = async (req, res) => {
  await db.connect();
  const course = req.course;

  //fetch all course sections and course lectures;
  if (course) {
    //{[id1]:2,[id2]:0,[id3]:1}
    const sectionIdIdxMap = {};

    const sections = await PublishedCourseSection.find({ course: course._id });
    const lectures = await PublishedLecture.find({ course: course._id });

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

export const getPublishedCourseItemsServer = async ({
  filters = {},
  order = {},
  pageSize = 6,
  page = 1,
}) => {
  await db.connect();
  const courses = await PublishedCourse.find(filters)
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean()
    .select([
      'title',
      'subtitle',
      'price',
      'category',
      'subcategory',
      'updatedAt',
    ])
    .populate([{ path: 'author', select: ['name'] }]);
  for (const course of courses) {
    course._id = course._id.toString();
    course.id = course._id;
    course.author._id = course.author._id.toString();
    course.author.id = course.author._id;
    course.updatedAt = course.updatedAt.toString();
  }
  return courses;
};
