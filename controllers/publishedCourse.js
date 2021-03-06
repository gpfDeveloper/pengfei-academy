import PublishedCourse from 'models/PublishedCourse';
import PublishedCourseSection from 'models/PublishedCourseSection';
import PublishedLecture from 'models/PublishedLecture';
// necessary to since we populate user,course
import User from 'models/User';
import Course from 'models/Course';
import VideoLecture from 'models/VideoLecture';
import db from 'utils/db';
import { cloudFrontSigner } from 'utils/aws';

import { COURSE_CATEGORY, CF_DOMAINS } from 'utils/constants';

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
  const course = await PublishedCourse.findById(courseId, {
    createdAt: 0,
    updatedAt: 0,
  }).populate([{ path: 'course', select: ['image', 'promoVideo'] }]);

  //fetch all course sections and course lectures;
  if (course) {
    //{[id1]:2,[id2]:0,[id3]:1}
    const sectionIdIdxMap = {};

    const sections = await PublishedCourseSection.find(
      { course: course._id },
      {
        course: 0,
        courseSection: 0,
        createdAt: 0,
        updatedAt: 0,
      }
    );
    const lectures = await PublishedLecture.find(
      { course: course._id },
      {
        section: 0,
        course: 0,
        createdAt: 0,
        updatedAt: 0,
        lecture: 0,
        video: 0,
      }
    );

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
      lectureIdMap[lecture.id] = lecture;
    }

    const ret = course.toObject({ getters: true });
    ret.image = course.course.image || null;
    ret.promoVideo = course.course.promoVideo || null;
    ret.course = null;
    ret.authorUpdatedAt = ret.authorUpdatedAt.toISOString();

    for (const _section of sections) {
      const section = _section.toObject({ getters: true });
      section._id = section._id.toString();
      const sectionIdx = sectionIdIdxMap[section.id];
      ret.sections[sectionIdx] = section;
      for (let i = 0; i < section.lectures.length; i++) {
        const lectureId = section.lectures[i].toString();
        section.lectures[i] = lectureIdMap[lectureId];
      }
    }
    ret._id = ret._id.toString();
    ret.author = ret.author.toString();
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
    const lectures = await PublishedLecture.find({
      course: course._id,
    }).populate([{ path: 'video', select: ['fileName', 's3Key'] }]);

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
  _category,
  _subcategory,
  _searchQuery,
  _language,
  _price,
  _page = 1,
  _pageSize = 6,
}) => {
  await db.connect();
  const category = _category || 'all';
  const subcategory = _subcategory || 'all';
  const searchQuery = _searchQuery || '';
  const language = _language || 'all';
  // price all, paid, free
  const price = _price || 'all';

  const searchQueryFilter = searchQuery
    ? {
        title: {
          $regex: searchQuery,
          $options: 'i',
        },
      }
    : {};

  const categoryFilter = category !== 'all' ? { category } : {};
  const subcategoryFilter = subcategory !== 'all' ? { subcategory } : {};
  const languageFilter = language !== 'all' ? { language } : {};
  let priceFilter;
  if (price === 'free') {
    priceFilter = { price: 0 };
  } else if (price === 'paid') {
    priceFilter = { price: { $gt: 0 } };
  } else {
    priceFilter = {};
  }

  const filters = {
    ...searchQueryFilter,
    ...categoryFilter,
    ...subcategoryFilter,
    ...languageFilter,
    ...priceFilter,
  };
  const order = { priority: -1, updatedAt: -1 };
  const courseItems = await PublishedCourse.find(filters)
    .sort(order)
    .skip(_pageSize * (_page - 1))
    .limit(_pageSize)
    .lean()
    .select([
      'title',
      'subtitle',
      'price',
      'category',
      'subcategory',
      'updatedAt',
      'priority',
    ])
    .populate([
      { path: 'author', select: ['name'] },
      { path: 'course', select: ['image'] },
    ]);
  for (const course of courseItems) {
    course._id = course._id.toString();
    course.id = course._id;
    course.author._id = course.author._id.toString();
    course.author.id = course.author._id;
    course.updatedAt = course.updatedAt.toString();
    course.image = course.course.image || null;
    course.course = null;
  }
  const courseCount = await PublishedCourse.countDocuments(filters);
  const publishedCategories = await PublishedCourse.find().distinct('category');
  let publishedSubcategories = await PublishedCourse.find().distinct(
    'subcategory'
  );

  if (_category) {
    const avaliableSubCategories = COURSE_CATEGORY[_category].subcategory;
    publishedSubcategories = publishedSubcategories.filter((item) => {
      if (item in avaliableSubCategories) return true;
      return false;
    });
  }

  const publishedLanguages = await PublishedCourse.find().distinct('language');
  const pageCount = Math.ceil(courseCount / _pageSize);
  return {
    courseCount,
    courseItems,
    pageCount,
    publishedCategories,
    publishedSubcategories,
    publishedLanguages,
  };
};

export const getSignedCoursePromoVideoUrl = (req, res) => {
  const { s3Key } = req.body;
  const resourceUrl = `https://${CF_DOMAINS.coursePromoVideo}/${s3Key}`;
  //expires in two hours
  const resourceUrlExpires = Math.floor(
    (Date.now() + 2 * 60 * 60 * 1000) / 1000
  );
  const url = cloudFrontSigner.getSignedUrl({
    url: resourceUrl,
    expires: resourceUrlExpires,
  });
  res.status(200).json({ url });
};

export const getSignedLectureVideoUrl = (req, res) => {
  const { s3Key } = req.body;
  const resourceUrl = `https://${CF_DOMAINS.lectureVideo}/${s3Key}`;
  //expires in two hours
  const resourceUrlExpires = Math.floor(
    (Date.now() + 2 * 60 * 60 * 1000) / 1000
  );
  const url = cloudFrontSigner.getSignedUrl({
    url: resourceUrl,
    expires: resourceUrlExpires,
  });
  res.status(200).json({ url });
};

export const getAllPublishedCourseIdsServer = async () => {
  await db.connect();
  const ids = await PublishedCourse.find({}).select('_id');
  return ids.map((id) => id._id.toString());
};
