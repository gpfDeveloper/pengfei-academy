import db from 'utils/db';
import User from 'models/User';
import Profile from 'models/Profile';

export const updateProfile = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const { name, bio, headline } = req.body;
  const user = await User.findById(userId);
  if (user) {
    user.name = name;
    let profile;
    if (user.profile) {
      profile = await Profile.findById(user.profile);
      profile.bio = bio;
      profile.headline = headline;
    } else {
      profile = new Profile({ user: user._id, headline, bio });
      user.profile = profile._id;
    }
    try {
      await user.save();
      await profile.save();
      return res.status(200).send();
    } catch (err) {
      return res
        .status(422)
        .json({ message: 'Update profile failed, please try again latter' });
    }
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};

export const getProfile = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user) {
    const name = user.name;
    let headline = '';
    let bio = '';
    if (user.profile) {
      const profile = await Profile.findById(user.profile);
      headline = profile.headline;
      bio = profile.bio;
    }
    res.status(200).json({ name, headline, bio });
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};
