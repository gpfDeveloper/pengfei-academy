import db from 'utils/db';
import TeachRequest from 'models/TeachRequest';
import User from 'models/User';
import Notification from 'models/Notification';
import { TEACH_REQUEST_STATUS } from 'utils/constants';

export const sendRequest = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const { skypeName, message } = req.body;
  const user = await User.findById(userId).populate('teachRequest');
  if (user) {
    try {
      let teachRequest;
      if (!user.teachRequest) {
        teachRequest = new TeachRequest({ skypeName, message, user });
        user.teachRequest = teachRequest;
      } else {
        teachRequest = user.teachRequest;
        teachRequest.skypeName = skypeName;
        teachRequest.message = message;
        teachRequest.status = TEACH_REQUEST_STATUS.draft;
      }

      await teachRequest.save();
      await user.save();

      res.status(200).send();
      const admin = await User.findOne({ isAdmin: true });
      admin.unReadNotificationCount += 1;
      const notification = await Notification.findById(admin.notification);
      notification.items.push({
        message: `A teach request was received from ${user.name}`,
      });
      admin.save();
      notification.save();
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
    const skypeName = user.teachRequest?.skypeName || '';
    const message = user.teachRequest?.message || '';
    const status = user.teachRequest?.status;
    res.status(200).json({ skypeName, message, status });
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};
