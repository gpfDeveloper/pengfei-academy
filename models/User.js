import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, max: 200 },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      max: 200,
    },
    password: { type: String, required: true, trim: true, min: 6, max: 64 },
    headline: { type: String, trim: true, max: 60 },
    bio: { type: String, trim: true, max: 400 },
    avatar: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isInstructor: {
      type: Boolean,
      default: false,
    },
    teachRequest: {
      type: mongoose.Types.ObjectId,
      ref: 'TeachRequest',
    },
    notification: {
      type: mongoose.Types.ObjectId,
      ref: 'Notification',
    },
    unReadNotificationCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
