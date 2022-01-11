import mongoose from 'mongoose';
import { NOTIFICATION_TYPES } from 'utils/constants';

const { system: SYSTEM, message: MESSAGE } = NOTIFICATION_TYPES;

const NotificationItem = new mongoose.Schema(
  {
    message: { type: String, trim: true, required: true, maxlength: 1000 },
    type: {
      type: String,
      default: SYSTEM,
      enum: [SYSTEM, MESSAGE],
    },
  },
  { timestamps: true }
);

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    items: [NotificationItem],
  },
  { timestamps: true }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model('Notification', notificationSchema);
export default Notification;
