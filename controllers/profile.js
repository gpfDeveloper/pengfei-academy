import db from 'utils/db';
import User from 'models/User';
import Profile from 'models/Profile';
import { S3 } from 'utils/aws';
import { S3_BUCKETS, CF_DOMAINS } from 'utils/constants';
import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

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
      const session = await mongoose.startSession();
      session.startTransaction();
      await user.save({ session });
      await profile.save({ session });
      await session.commitTransaction();
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

export const getProfileAvatarUrl = async (req, res) => {
  await db.connect();
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user) {
    let profileAvatarUrl = null;
    if (user.profile) {
      const profile = await Profile.findById(user.profile);
      profileAvatarUrl = profile.avatar?.cfLocation;
    }
    res.status(200).json({ profileAvatarUrl });
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
    let avatarUrl = '';
    if (user.profile) {
      const profile = await Profile.findById(user.profile);
      headline = profile.headline;
      bio = profile.bio;
      website = profile.website;
      avatarUrl = profile.avatar?.cfLocation;
    }
    res
      .status(200)
      .json({ name, headline, bio, website, isInstructor, avatarUrl });
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
      headline = profile.headline || null;
      bio = profile.bio || null;
      website = profile.website || null;
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
    let isSaveUser = false;
    if (user.profile) {
      profile = await Profile.findById(user.profile);
    } else {
      profile = new Profile({ user: user._id });
      user.profile = profile._id;
      isSaveUser = true;
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
        Bucket: S3_BUCKETS.userAvatarBucket,
        Key: `${uuid()}.${type}`,
        Body: base64Data,
        ContentEncoding: 'base64',
        ContentType: `image/${type}`,
      };

      const uploadS3 = S3.upload(params).promise();
      const { key: s3Key } = await uploadS3.then();

      // delete the origin avatar from S3 if exists
      const originAvatar = profile.avatar;
      if (originAvatar) {
        S3.deleteObject(
          { Bucket: originAvatar.s3Bucket, Key: originAvatar.s3Key },
          (err, data) => {
            if (err) console.log(err, err.stack);
            else console.log(data);
          }
        );
      }

      const cfLocation = `https://${CF_DOMAINS.userAvatar}/${s3Key}`;

      profile.avatar = {
        s3Key,
        cfLocation,
        s3Bucket: S3_BUCKETS.userAvatarBucket,
      };

      if (isSaveUser) {
        const session = await mongoose.startSession();
        session.startTransaction();
        await user.save({ session });
        await profile.save({ session });
        await session.commitTransaction();
      } else {
        await profile.save();
      }
      return res.status(200).json({ userAvatarUrl: cfLocation });
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
