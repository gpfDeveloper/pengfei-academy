import db from 'utils/db';
import TeachRequest from 'models/TeachRequest';
import User from 'models/User';
import Notification from 'models/Notification';
import Conversation from 'models/Conversation';
import Message from 'models/Message';

import { TEACH_REQUEST_STATUS } from 'utils/constants';

export const sendRequest = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const { message: reqMsg } = req.body;
  const user = await User.findById(userId).populate('teachRequest');
  if (user) {
    try {
      let teachRequest;
      if (!user.teachRequest) {
        teachRequest = new TeachRequest({ message: reqMsg, user });
        user.teachRequest = teachRequest._id;
      } else {
        teachRequest = user.teachRequest;
        teachRequest.message = reqMsg;
        teachRequest.status = TEACH_REQUEST_STATUS.draft;
      }

      await teachRequest.save();
      await user.save();

      //send notification to admin
      const admin = await User.findOne({ isAdmin: true });
      admin.unReadNotificationCount += 1;
      const notification = await Notification.findById(admin.notification);
      notification.items.push({
        message: `A teach request was received from ${user.name}`,
      });
      notification.save();

      //send message to admin
      const conversation = await Conversation.findById(
        user.conversationWithAdmin
      );
      const message = new Message({
        conversation: conversation._id,
        sender: user._id,
        text: reqMsg,
      });
      conversation.lastMsg = message._id;
      admin.unReadMsgCount += 1;

      await admin.save();
      await message.save();
      await conversation.save();

      res.status(200).send();
    } catch (err) {
      console.log(err);
      return res
        .status(422)
        .json({ message: 'Send request failed, please try again latter' });
    }
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};

export const fetchRequest = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId).populate('teachRequest');
  if (user) {
    const message = user.teachRequest?.message || '';
    const status = user.teachRequest?.status;
    res.status(200).json({ message, status });
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};
