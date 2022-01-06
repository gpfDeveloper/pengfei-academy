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
  },
  { timestamps: true }
);

const TeachRequest =
  mongoose.models.TeachRequest ||
  mongoose.model('TeachRequest', teachRequestSchema);
export default TeachRequest;
