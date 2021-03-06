import db from 'utils/db';
import User from 'models/User';
import Profile from 'models/Profile';
import Conversation from 'models/Conversation';
import Message from 'models/Message';
import mongoose from 'mongoose';

//member1Id < member2Id
export const getMember1 = (id1, id2) => {
  if (id1 < id2) return id1;
  else return id2;
};

export const getMember2 = (id1, id2) => {
  if (id1 > id2) return id1;
  else return id2;
};

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
    member1: getMember1(sender._id, receiver._id),
    member2: getMember2(sender._id, receiver._id),
  });

  if (!conversation) {
    conversation = new Conversation();
    conversation.member1 = getMember1(sender._id, receiver._id);
    conversation.member2 = getMember2(sender._id, receiver._id);
  }

  const message = new Message({
    conversation: conversation._id,
    sender: sender._id,
    text,
  });
  conversation.lastMsg = message._id;

  const session = await mongoose.startSession();
  session.startTransaction();
  await message.save({ session });
  await conversation.save({ session });
  await session.commitTransaction();

  res.status(200).json({ message: message.toObject({ getters: true }) });

  receiver.unReadMsgCount += 1;
  receiver.save();
};

//Create converstion if coversation not exist, send message if text if provided, called in server.
export const sendMessageServer = async ({ senderId, receiverId, text }) => {
  await db.connect();
  let conversation;
  // find exist conversation frist
  conversation = await Conversation.findOne({
    member1: getMember1(senderId, receiverId),
    member2: getMember2(senderId, receiverId),
  });

  if (!conversation) {
    conversation = new Conversation();
    conversation.member1 = getMember1(senderId, receiverId);
    conversation.member2 = getMember2(senderId, receiverId);
  }

  if (text) {
    const message = new Message({
      conversation: conversation._id,
      sender: senderId,
      text,
    });
    conversation.lastMsg = message._id;
    await message.save();
  }
  await conversation.save();
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
      convInfo.userId = convUser._id.toString();
      convInfo.userAvatar = null;
      const userProfile = await Profile.findOne({ user: convInfo.userId });
      if (userProfile && userProfile.avatar) {
        convInfo.userAvatar = userProfile.avatar.cfLocation;
      }
      const lastMsg = await Message.findById(conv.lastMsg).select({
        text: 1,
        sender: 1,
      });
      if (lastMsg) {
        convInfo.lastMsg = lastMsg.text;
        convInfo.isSendByMe = lastMsg.sender.toString() === userId;
      }
      conversations.push(convInfo);
    }
  }
  res.status(200).json({ conversations });
};

export const getMsgsByConversation = async (req, res) => {
  const conversationId = req.query.id;
  const member1 = req.member1;
  const member2 = req.member2;
  await db.connect();
  //get avatar
  let member1Avatar = null;
  let member2Avatar = null;
  const member1Profile = await Profile.findOne({ user: member1._id });
  if (member1Profile && member1Profile.avatar) {
    member1Avatar = member1Profile.avatar.cfLocation;
  }
  const member2Profile = await Profile.findOne({ user: member2._id });
  if (member2Profile && member2Profile.avatar) {
    member2Avatar = member2Profile.avatar.cfLocation;
  }
  const messages = [];
  const relatedMsg = await Message.find({ conversation: conversationId }).sort({
    createdAt: 'asc',
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
  res.status(200).json({
    messages,
    member1: {
      ...member1.toObject({ getters: true }),
      userAvatar: member1Avatar,
    },
    member2: {
      ...member2.toObject({ getters: true }),
      userAvatar: member2Avatar,
    },
  });
};

export const clearUnReadMsgCount = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user) {
    user.unReadMsgCount = 0;
    try {
      await user.save();
      return res.status(200).send();
    } catch (err) {
      return res.status(500).json({ message: 'Clear failed.' });
    }
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};
