import db from 'utils/db';
import User from 'models/User';
// import Notification from 'models/Notification';
import Conversation from 'models/Conversation';
import Message from 'models/Message';

export const sendMessage = async (req, res) => {
  const senderId = req.user.id;
  const { receiverId, text } = req.body;
  if (!text) {
    return res.status(422).json({ message: 'Message text not provided.' });
  }
  if (receiverId === senderId) {
    return res.status(422).json({ message: 'Same receiver and sender.' });
  }
  await db.connect();
  const sender = await User.findById(senderId);
  if (!sender) {
    return res.status(404).json({ message: 'Sender not found.' });
  }
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    return res.status(404).json({ message: 'Receiver not found.' });
  }
  let conversation;
  // find exist conversation frist
  conversation = await Conversation.findOne({
    $and: [
      { member1: { $in: [sender, receiver] } },
      { member2: { $in: [sender, receiver] } },
    ],
  });

  if (!conversation) {
    conversation = new Conversation();
    conversation.member1 = sender;
    conversation.member2 = receiver;
    await conversation.save();
  }

  const message = new Message({ conversation, sender, text });
  await message.save();
  res.status(200).json({ message: 'Message send success' });

  //to do, send notification to receiver.
};
