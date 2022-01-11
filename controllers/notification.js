import User from 'models/User';
import Notification from 'models/Notification';
import db from 'utils/db';

export const clearUnReadNotificationCount = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user) {
    user.unReadNotificationCount = 0;
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

export const getNotifications = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user) {
    let notificationItems = [];
    if (user.notification) {
      const notificationObj = await Notification.findById(user.notification);
      notificationItems = notificationObj.items;
    }
    return res.status(200).json({
      notifications: notificationItems.map((noti) =>
        noti.toObject({ getters: true })
      ),
    });
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};

export const deleteNotificationItem = async (req, res) => {
  const notificationItemId = req.query.id;
  if (!notificationItemId) {
    return res
      .status(422)
      .json({ message: 'Notification item id not provided' });
  }
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user) {
    if (user.notification) {
      const notificationObj = await Notification.findById(user.notification);
      const notificationItems = notificationObj.items;
      const idx = notificationItems
        .map((noti) => noti._id.toString())
        .indexOf(notificationItemId);
      if (idx === -1) {
        return res.status(404).json({ message: 'Notification item not found' });
      }
      notificationItems.splice(idx, 1);
      await notificationObj.save();
      return res.status(200).send();
    } else {
      return res.status(404).json({ message: 'Notification not found' });
    }
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};
