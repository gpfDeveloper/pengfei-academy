import mongoose from 'mongoose';

const VideoLectureSchema = new mongoose.Schema(
  {
    isDeletedByAuthor: {
      type: Boolean,
      default: false,
    },
    s3Key: {
      type: String,
      required: true,
    },
    s3Bucket: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    fileName: {
      type: String,
    },
    fileSize: {
      type: Number,
    },
    lecture: {
      type: mongoose.Types.ObjectId,
      ref: 'Lecture',
      index: true,
    },
    publishedLecture: {
      type: mongoose.Types.ObjectId,
      ref: 'PublishedLecture',
      index: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Course',
      index: true,
    },
  },
  { timestamps: true }
);

const VideoLecture =
  mongoose.models.VideoLecture ||
  mongoose.model('VideoLecture', VideoLectureSchema);
export default VideoLecture;
