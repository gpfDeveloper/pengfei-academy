import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      unique: true,
      required: true,
      ref: 'User',
    },
    headline: { type: String, trim: true, maxlength: 60 },
    bio: { type: String, trim: true, maxlength: 6000 },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const Profile =
  mongoose.models.Profile || mongoose.model('Profile', profileSchema);
export default Profile;
