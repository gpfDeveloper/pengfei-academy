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
      ref: 'Message',
    },
  },
  { timestamps: true }
);

//Each user pair at most have one conversation, and member1Id < member2Id
conversationSchma.index({ member1: 1, member2: 1 }, { unique: true });

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model('Conversation', conversationSchma);
export default Conversation;
