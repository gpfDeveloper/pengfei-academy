import mongoose from 'mongoose';
import { NOTIFICATION_TYPES } from 'utils/constants';

const { system: SYSTEM, message: MESSAGE } = NOTIFICATION_TYPES;

const SingleNotificationSchema = new mongoose.Schema(
  {
    message: { type: String, trim: true, required: true, max: 1000 },
    type: {
      type: String,
      required: true,
      enum: [SYSTEM, MESSAGE],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    notifications: [SingleNotificationSchema],
  },
  { timestamps: true }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model('Notification', notificationSchema);
export default Notification;