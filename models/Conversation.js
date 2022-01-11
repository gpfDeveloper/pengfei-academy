import mongoose from 'mongoose';

const conversationSchma = new mongoose.Schema(
  {
    member1: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    member2: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    lastMsg: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Message',
    },
  },
  { timestamps: true }
);

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model('Conversation', conversationSchma);
export default Conversation;
