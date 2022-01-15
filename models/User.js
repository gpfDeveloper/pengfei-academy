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
      select: false,
      minlength: 6,
      maxlength: 64,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isInstructor: {
      type: Boolean,
      default: false,
    },
    profile: {
      type: mongoose.Types.ObjectId,
      ref: 'Profile',
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
