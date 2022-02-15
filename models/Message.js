import mongoose from 'mongoose';

const messageSchma = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Types.ObjectId,
      required: true,
      index: true,
      ref: 'Conversation',
    },
    sender: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

const Message =
  mongoose.models.Message || mongoose.model('Message', messageSchma);
export default Message;
