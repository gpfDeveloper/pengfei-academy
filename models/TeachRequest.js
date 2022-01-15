import mongoose from 'mongoose';
import { TEACH_REQUEST_STATUS } from 'utils/constants';

const { draft, approved, rejected } = TEACH_REQUEST_STATUS;

const teachRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    message: {
      type: String,
      trim: true,
      required: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      default: draft,
      enum: [draft, approved, rejected],
    },
    hasMeeting: {
      type: Boolean,
      default: false,
    },
    adminComment: {
      type: String,
      maxlength: 6000,
      default: '',
    },
  },
  { timestamps: true }
);

const TeachRequest =
  mongoose.models.TeachRequest ||
  mongoose.model('TeachRequest', teachRequestSchema);
export default TeachRequest;
