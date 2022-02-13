import db from 'utils/db';
import User from 'models/User';
import Profile from 'models/Profile';
import { S3 } from 'utils/aws';
import { v4 as uuid } from 'uuid';

export const updateProfile = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const { name, bio, headline, website } = req.body;
  const user = await User.findById(userId);
  if (user) {
    user.name = name;
    let profile;
    if (user.profile) {
      profile = await Profile.findById(user.profile);
      profile.bio = bio;
      profile.headline = headline;
      profile.website = website;
    } else {
      profile = new Profile({ user: user._id, headline, bio, website });
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
    let website = '';
    if (user.profile) {
      const profile = await Profile.findById(user.profile);
      headline = profile.headline;
      bio = profile.bio;
      website = profile.website;
    }
    res.status(200).json({ name, headline, bio, website });
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};

export const getPublicProfile = async (req, res) => {
  await db.connect();
  const userId = req.query.uid;
  const user = await User.findById(userId);
  if (user) {
    const name = user.name;
    const isInstructor = user.isInstructor;
    let headline = '';
    let bio = '';
    let website = '';
    if (user.profile) {
      const profile = await Profile.findById(user.profile);
      headline = profile.headline;
      bio = profile.bio;
      website = profile.website;
    }
    res.status(200).json({ name, headline, bio, website, isInstructor });
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};
export const getPublicProfileServer = async (userId) => {
  await db.connect();
  const user = await User.findById(userId);
  if (user) {
    const name = user.name;
    const isInstructor = user.isInstructor;
    let headline = '';
    let bio = '';
    let website = '';
    if (user.profile) {
      const profile = await Profile.findById(user.profile);
      headline = profile.headline;
      bio = profile.bio;
      website = profile.website;
    }
    return { name, headline, bio, website, isInstructor };
  } else {
    throw new Error('User not found');
  }
};

export const updateProfileAvatar = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const { imgBase64 } = req.body;

  const user = await User.findById(userId);
  if (user) {
    let profile;
    if (user.profile) {
      profile = await Profile.findById(user.profile);
    } else {
      profile = new Profile({ user: user._id });
      user.profile = profile._id;
    }
    try {
      // prepare the image
      const base64Data = new Buffer.from(
        imgBase64.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );

      const type = imgBase64.split(';')[0].split('/')[1];

      // image params
      const params = {
        Bucket: 'pengfei-academy-public-bucket',
        Key: `${uuid()}.${type}`,
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`,
      };

      // upload to s3
      S3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
          return res.sendStatus(400);
        }
        console.log(data);
        // res.send(data);
      });

      // await user.save();
      // await profile.save();
      return res.status(200).send();
    } catch (err) {
      console.log(err);
      return res.status(422).json({
        message: 'Update profile avatar failed, please try again latter',
      });
    }
  } else {
    return res.status(404).json({ message: 'User not found.' });
  }
};
