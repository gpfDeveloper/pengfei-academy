import mongoose from 'mongoose';
import { USER_ROLES } from 'utils/constants';

const {
  User: RoleUser,
  Instructor: RoleInstructor,
  Administrator: RoleAdminstrator,
} = USER_ROLES;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, max: 200 },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      max: 200,
    },
    password: { type: String, required: true, trim: true, min: 6, max: 64 },
    headline: { type: String, trim: true, max: 60 },
    bio: { type: String, trim: true, max: 400 },
    avatar: {
      type: String,
      default: '/avatar.png',
    },
    roles: {
      type: [String],
      default: [RoleUser],
      enum: [RoleUser, RoleInstructor, RoleAdminstrator],
    },
    teachRequest: {
      type: mongoose.Types.ObjectId,
      ref: 'TeachRequest',
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
