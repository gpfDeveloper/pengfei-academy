import db from 'utils/db';
import TeachRequest from 'models/TeachRequest';
import User from 'models/User';

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
