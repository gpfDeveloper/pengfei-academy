import User from 'models/User';
import Course from 'models/Course';
import CourseSection from 'models/CourseSection';
import Lecture from 'models/Lecture';
import PublishedCourse from 'models/PublishedCourse';
import PublishedCourseSection from 'models/PublishedCourseSection';
import PublishedLecture from 'models/PublishedLecture';
import CourseReviewRequest from 'models/CourseReviewRequest';
import Notification from 'models/Notification';
import db from 'utils/db';
import { isValidCategory } from 'utils';
import { COURSE_REVIEW_STATUS } from 'utils/constants';
import mongoose from 'mongoose';
import { S3_BUCKETS, CF_DOMAINS } from 'utils/constants';
import { v4 as uuid } from 'uuid';
import { S3, cloudFrontSigner } from 'utils/aws';
import VideoLecture from 'models/VideoLecture';

//delete origin video file if exist and not published, if it is published, mark it to deleted, and will delete it when publish again.
const _deleteOrMarkAsDeleteLectureVideo = async (lecture) => {
  if (!lecture.video) return;
  const originVideo = await VideoLecture.findById(lecture.video);
  if (!originVideo) return;
  let hasPublishedLecture = false;
  if (originVideo.publishedLecture) {
    const publishedLecture = await PublishedLecture.findById(
      originVideo.publishedLecture
    );
    if (publishedLecture) {
      hasPublishedLecture = true;
    }
  }
  if (!hasPublishedLecture) {
    S3.deleteObject(
      { Bucket: originVideo.s3Bucket, Key: originVideo.s3Key },
      (err, data) => {
        if (err) console.log(err, err.stack);
        else console.log(data);
      }
    );
    await originVideo.delete();
  } else {
    originVideo.isDeletedByAuthor = true;
    await originVideo.save();
  }
};

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
    const lectures = await Lecture.find({ course: course._id }).populate([
      { path: 'video', select: ['fileName', 's3Key'] },
    ]);

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
  const { welcomeMsg } = req.body;
  course.welcomeMsg = welcomeMsg;
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

export const deleteCourse = async (req, res) => {
  const course = req.course;
  if (course.numOfStudents > 0) {
    return res.status(403).json({
      message: 'Course cannot delete since already have students enrolled',
    });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  await CourseSection.deleteMany({ course: course._id }, { session: session });
  await Lecture.deleteMany({ course: course._id }, { session: session });
  await Course.findByIdAndDelete(course._id, { session: session });

  //Delete published course
  if (course.publishedCourse) {
    await PublishedCourse.findByIdAndDelete(course.publishedCourse, {
      session,
    });
    await PublishedCourseSection.deleteMany(
      { course: course.publishedCourse },
      { session }
    );
    await PublishedLecture.deleteMany(
      { course: course.publishedCourse },
      { session }
    );
  }

  //delete video lectures
  const videoLectures = await VideoLecture.find({ course });
  for (const video of videoLectures) {
    S3.deleteObject(
      { Bucket: video.s3Bucket, Key: video.s3Key },
      (err, data) => {
        if (err) console.log(err, err.stack);
        else console.log(data);
      }
    );
    await video.delete({ session });
  }

  //delete course image on S3 if exist
  if (course.image) {
    S3.deleteObject(
      { Bucket: course.image.s3Bucket, Key: course.image.s3Key },
      (err, data) => {
        if (err) console.log(err, err.stack);
        else console.log(data);
      }
    );
  }

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
  const lectures = await Lecture.find({ section: sectionId });
  for (const lecture of lectures) {
    await _deleteOrMarkAsDeleteLectureVideo(lecture);
    await lecture.delete({ session });
  }
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
  const lecture = await Lecture.findById(lectureId);
  const courseSection = await CourseSection.findById(sectionId);
  courseSection.lectures = courseSection.lectures.filter(
    (id) => id.toString() !== lectureId
  );

  const session = await mongoose.startSession();
  session.startTransaction();

  await courseSection.save({ session });

  await _deleteOrMarkAsDeleteLectureVideo(lecture);

  await lecture.delete({ session });
  await session.commitTransaction();
  res.status(200).send();
};

export const editLecture = async (req, res) => {
  const { lectureId } = req.query;
  const { title, contentType, article } = req.body;
  if (!lectureId || !title)
    return res
      .status(422)
      .json({ message: 'Lecture Id or title not provided.' });

  await db.connect();
  const lecture = await Lecture.findById(lectureId).populate([
    { path: 'video', select: ['fileName'] },
  ]);
  if (lecture) {
    lecture.title = title;
    if (contentType) {
      lecture.contentType = contentType;
    }
    if (article) {
      lecture.article = article;
    }
    await lecture.save();
    return res
      .status(200)
      .json({ lecture: lecture.toObject({ getters: true }) });
  } else {
    return res.status(404).json({ message: 'Lecture not found.' });
  }
};

export const dragDropCourseSection = async (req, res) => {
  const course = req.course;
  const { sectionDragIdx, sectionDropIdx } = req.body;
  if (!course || sectionDragIdx === undefined || sectionDropIdx === undefined) {
    return res
      .status(422)
      .json({ message: 'Course or dragIdx or dropIdx not provided.' });
  }
  const sectionId = course.sections[sectionDragIdx];
  course.sections.splice(sectionDragIdx, 1);
  course.sections.splice(sectionDropIdx, 0, sectionId);
  await db.connect();
  await course.save();
  return res.status(200).send();
};

export const dragDropLectureSameSection = async (req, res) => {
  const { sectionId, lectureDragIdx, lectureDropIdx } = req.body;
  if (
    lectureDragIdx === undefined ||
    lectureDropIdx === undefined ||
    sectionId === undefined
  ) {
    return res.status(422).json({
      message: 'SectionId or dragIdx or dropIdx not provided.',
    });
  }
  await db.connect();
  const section = await CourseSection.findById(sectionId);
  const lectureId = section.lectures[lectureDragIdx];
  section.lectures.splice(lectureDragIdx, 1);
  section.lectures.splice(lectureDropIdx, 0, lectureId);
  await section.save();
  return res.status(200).send();
};

export const dragDropLectureOtherSection = async (req, res) => {
  const { sectionDragId, sectionDropId, lectureDragIdx, lectureDropIdx } =
    req.body;
  if (
    lectureDragIdx === undefined ||
    lectureDropIdx === undefined ||
    sectionDragId === undefined ||
    sectionDropId === undefined
  ) {
    return res.status(422).json({
      message: 'SectionId or dragIdx or dropIdx not provided.',
    });
  }
  await db.connect();
  const sectionDrag = await CourseSection.findById(sectionDragId);
  const sectionDrop = await CourseSection.findById(sectionDropId);
  const lectureId = sectionDrag.lectures[lectureDragIdx];
  const lecture = await Lecture.findById(lectureId);
  lecture.section = sectionDrop._id;
  sectionDrag.lectures.splice(lectureDragIdx, 1);
  sectionDrop.lectures.splice(lectureDropIdx, 0, lectureId);
  const session = await mongoose.startSession();
  session.startTransaction();
  await sectionDrag.save({ session });
  await sectionDrop.save({ session });
  await lecture.save({ session });
  await session.commitTransaction();

  return res.status(200).send();
};

export const submitCourseForReview = async (req, res) => {
  const course = req.course;
  let reviewReq;
  if (course.reviewReq) {
    reviewReq = await CourseReviewRequest.findById(course.reviewReq);
  } else {
    const userId = course.author;
    reviewReq = new CourseReviewRequest({
      course: course._id,
      user: userId,
    });
    course.reviewReq = reviewReq._id;
  }
  course.reviewStatus = COURSE_REVIEW_STATUS.reviewing;
  reviewReq.status = COURSE_REVIEW_STATUS.reviewing;

  const session = await mongoose.startSession();
  session.startTransaction();
  await reviewReq.save({ session });
  await course.save({ session });
  await session.commitTransaction();

  //send notification to admin
  const admin = await User.findOne({ isAdmin: true });
  admin.unReadNotificationCount += 1;
  const notification = await Notification.findById(admin.notification);
  notification.items.push({
    message: `A course review request was received: ${course.title}`,
  });
  admin.save();
  notification.save();

  return res.status(200).send();
};

export const uploadLectureVideo = async (req, res) => {
  const { lectureId, id: courseId } = req.query;
  const userId = req.user.id;
  const videoFile = req.file;

  if (!lectureId || !videoFile)
    return res
      .status(422)
      .json({ message: 'lectureId or video file not provided' });

  await db.connect();
  const lecture = await Lecture.findById(lectureId);
  if (!lecture) return res.status(404).json({ message: 'lecture not found.' });

  //videoFile format:
  // {
  //   fieldname: 'lectureVideo',
  //   originalname: 'Build and Deploy a Full Stack Realtime Chat Messaging App with Authentication .mp4',
  //   encoding: '7bit',
  //   mimetype: 'video/mp4',
  //   buffer: <Buffer 00 00 00 18 66 74 79 70 6d 70 34 32 00 00 00 00 69 73 6f 6d 6d 70 34 32 00 55 c9 99 6d 6f 6f 76 00 00 00 6c 6d 76 68 64 00 00 00 00 dd 52 87 cb dd 52 ... 327538644 more bytes>,
  //   size: 327538694
  // }

  const videoExt = videoFile.mimetype.split('/')[1];

  const params = {
    Bucket: S3_BUCKETS.lectureVideoBucket,
    Key: `${uuid()}.${videoExt}`,
    Body: videoFile.buffer,
    ContentType: videoFile.mimetype,
    Metadata: {
      originalName: videoFile.originalname,
    },
  };
  // {
  //   Location: 'https://pengfei-academy-lecture-video-bucket.s3.amazonaws.com/e9f96858-6cc4-42df-9bc8-150947c07deb.mp4',
  //   Bucket: 'pengfei-academy-lecture-video-bucket',
  //   Key: 'e9f96858-6cc4-42df-9bc8-150947c07deb.mp4',
  //   ETag: '"4277ff8a0d7a116c59318a51fdad24a4-2"'
  // }
  const uploadFile = S3.upload(params).promise();
  const { Key: s3Key } = await uploadFile.then();

  const videoLecture = new VideoLecture({
    s3Key,
    s3Bucket: S3_BUCKETS.lectureVideoBucket,
    author: userId,
    lecture: lectureId,
    course: courseId,
    fileName: videoFile.originalname,
    fileSize: videoFile.size,
  });

  const session = await mongoose.startSession();
  session.startTransaction();
  await videoLecture.save(session);

  await _deleteOrMarkAsDeleteLectureVideo(lecture);

  lecture.video = videoLecture._id;
  lecture.contentType = 'video';
  await lecture.save(session);
  await session.commitTransaction();
  res.status(200).send();
};

export const uploadCourseImage = async (req, res) => {
  const { id: courseId } = req.query;
  const imageFile = req.file;

  if (!imageFile)
    return res
      .status(422)
      .json({ message: 'Course image file is not provided.' });

  await db.connect();
  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: 'Course not found.' });

  const imgExt = imageFile.mimetype.split('/')[1];

  const params = {
    Bucket: S3_BUCKETS.courseImageBucket,
    Key: `${uuid()}.${imgExt}`,
    Body: imageFile.buffer,
    ContentType: imageFile.mimetype,
  };

  const uploadFile = S3.upload(params).promise();
  const { Key: s3Key } = await uploadFile.then();

  const originImage = course.image;
  if (originImage) {
    S3.deleteObject(
      { Bucket: originImage.s3Bucket, Key: originImage.s3Key },
      (err, data) => {
        if (err) console.log(err, err.stack);
        else console.log(data);
      }
    );
  }
  const cfLocation = `https://${CF_DOMAINS.courseImage}/${s3Key}`;

  course.image = {
    s3Key,
    cfLocation,
    s3Bucket: S3_BUCKETS.courseImageBucket,
  };

  await course.save();

  res.status(200).json({ url: cfLocation });
};

export const getCourseImageUrl = async (req, res) => {
  const { id: courseId } = req.query;

  await db.connect();
  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: 'Course not found.' });

  res.status(200).json({ url: course.image?.cfLocation });
};

export const uploadCoursePromoVideo = async (req, res) => {
  const { id: courseId } = req.query;
  const videoFile = req.file;

  if (!videoFile)
    return res.status(422).json({ message: 'Video file is not provided.' });

  await db.connect();
  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: 'Course not found.' });

  const videoExt = videoFile.mimetype.split('/')[1];

  const params = {
    Bucket: S3_BUCKETS.coursePromoVideoBucket,
    Key: `${uuid()}.${videoExt}`,
    Body: videoFile.buffer,
    ContentType: videoFile.mimetype,
  };

  const uploadFile = S3.upload(params).promise();
  const { Key: s3Key } = await uploadFile.then();

  const originVideo = course.promoVideo;
  if (originVideo) {
    S3.deleteObject(
      { Bucket: originVideo.s3Bucket, Key: originVideo.s3Key },
      (err, data) => {
        if (err) console.log(err, err.stack);
        else console.log(data);
      }
    );
  }

  course.promoVideo = {
    s3Key,
    s3Bucket: S3_BUCKETS.coursePromoVideoBucket,
    size: videoFile.size,
  };

  await course.save();

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

export const getCoursePromoVideoUrl = async (req, res) => {
  const { id: courseId } = req.query;

  await db.connect();
  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: 'Course not found.' });

  let url;
  if (course.promoVideo) {
    const { s3Key } = course.promoVideo;
    const resourceUrl = `https://${CF_DOMAINS.coursePromoVideo}/${s3Key}`;
    //expires in two hours
    const resourceUrlExpires = Math.floor(
      (Date.now() + 2 * 60 * 60 * 1000) / 1000
    );
    url = cloudFrontSigner.getSignedUrl({
      url: resourceUrl,
      expires: resourceUrlExpires,
    });
  }

  res.status(200).json({ url });
};
