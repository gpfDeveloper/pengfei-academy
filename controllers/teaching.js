import db from 'utils/db';
import TeachRequest from 'models/TeachRequest';
import User from 'models/User';
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

      return res.status(200).send();
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
    res.status(200).json({ skypeName, message });
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};
