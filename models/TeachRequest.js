import mongoose from 'mongoose';

const teachRequestSchema = new mongoose.Schema(
  {
    skypeName: { type: String, trim: true, required: true, max: 200 },
    message: { type: String, trim: true, required: true, min: 100, max: 1000 },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      default: 'draft',
      enum: ['draft', 'approved', 'reject'],
    },
    hasMeeting: {
      type: Boolean,
      default: false,
    },
    adminComment: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const TeachRequest =
  mongoose.models.TeachRequest ||
  mongoose.model('TeachRequest', teachRequestSchema);
export default TeachRequest;
