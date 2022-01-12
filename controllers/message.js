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
  }

  const message = new Message({ conversation, sender, text });
  conversation.lastMsg = message;
  await message.save();
  await conversation.save();
  res.status(200).json({ message: 'Message send success' });

  //to do, send notification to receiver.
};

export const getConversations = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not exist.' });
  }
  const conversations = [];
  const relatedCons = await Conversation.find({
    $or: [{ member1: user }, { member2: user }],
  }).sort({ updatedAt: 'desc' });
  if (relatedCons && relatedCons.length > 0) {
    for (const conv of relatedCons) {
      const convInfo = {};
      convInfo.id = conv._id.toString();
      convInfo.lastMsgTime = conv.updatedAt;
      let convUser;
      if (conv.member1.toString() === userId) {
        convUser = await User.findById(conv.member2).select('name');
      } else {
        convUser = await User.findById(conv.member1).select('name');
      }
      convInfo.userName = convUser.name;
      const lastMsg = await Message.findById(conv.lastMsg).select({
        text: 1,
        sender: 1,
      });
      convInfo.lastMsg = lastMsg.text;
      convInfo.isSendByMe = lastMsg.sender.toString() === userId;
      conversations.push(convInfo);
    }
  }
  res.status(200).json({ conversations });
};

export const getMsgsByConversation = async (req, res) => {
  const conversationId = req.query.id;
  await db.connect();
  const messages = [];
  const relatedMsg = await Message.find({ conversation: conversationId }).sort({
    createdAt: 'desc',
  });
  for (const msg of relatedMsg) {
    const msgInfo = {};
    msgInfo.id = msg._id.toString();
    msgInfo.sendTime = msg.createdAt;
    msgInfo.senderId = msg.sender;
    const senderNameObj = await User.findById(msg.sender).select('name');
    msgInfo.senderName = senderNameObj.name;
    msgInfo.text = msg.text;
    messages.push(msgInfo);
  }
  res.status(200).json({ messages });
};
