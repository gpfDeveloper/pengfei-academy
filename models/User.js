import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, maxlength: 200 },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      max: 200,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 64,
    },
    headline: { type: String, trim: true, maxlength: 60 },
    bio: { type: String, trim: true, maxlength: 400 },
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
    unReadMsgCount: {
      type: Number,
      default: 0,
    },
    conversationWithAdmin: {
      type: mongoose.Types.ObjectId,
      ref: 'Conversation',
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
