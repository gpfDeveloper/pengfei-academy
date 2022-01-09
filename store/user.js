import { createSlice } from '@reduxjs/toolkit';
import { SESSION_EXPIRE_SEC } from 'utils/constants';
import Cookies from 'js-cookie';
import { USER_ROLES } from 'utils/constants';
const { Instructor: RoleInstructor, Administrator: RoleAdminstrator } =
  USER_ROLES;

const USER_INFO_KEY = 'userInfo';

let initialState = {
  isLogin: false,
  isInstructor: false,
  isAdmin: false,
  roles: [],
  name: '',
  email: '',
  headline: '',
  bio: '',
  token: '',
  unReadNotificationCount: 0,
  expireAt: null,
};

const userInfo = Cookies.get(USER_INFO_KEY);
if (userInfo) {
  initialState = JSON.parse(userInfo);
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (
      state,
      {
        payload: {
          name,
          email,
          headline,
          bio,
          token,
          roles,
          unReadNotificationCount,
        },
      }
    ) => {
      state.isLogin = true;
      state.isAdmin = roles.indexOf(RoleAdminstrator) !== -1;
      state.isInstructor = roles.indexOf(RoleInstructor) !== -1;
      state.name = name;
      state.email = email;
      state.roles = roles;
      state.token = token;
      state.headline = headline;
      state.bio = bio;
      state.unReadNotificationCount = unReadNotificationCount;
      state.expireAt = new Date().getTime() + SESSION_EXPIRE_SEC * 1000;
      Cookies.set(USER_INFO_KEY, JSON.stringify(state));
    },
    logout: (state) => {
      state.isLogin = false;
      state.isAdmin = false;
      state.isInstructor = false;
      state.name = null;
      state.email = null;
      state.roles = [];
      state.token = null;
      state.headline = '';
      state.bio = '';
      state.unReadNotificationCount = 0;
      state.expireAt = null;
      Cookies.remove(USER_INFO_KEY);
    },
    updateEmail: (state, { payload: email }) => {
      state.email = email;
      Cookies.set(USER_INFO_KEY, JSON.stringify(state));
    },
    updateProfile: (state, { payload: { name, headline, bio } }) => {
      state.name = name;
      state.headline = headline;
      state.bio = bio;
      Cookies.set(USER_INFO_KEY, JSON.stringify(state));
    },
    clearUnReadNotificationCount: (state) => {
      state.unReadNotificationCount = 0;
      Cookies.set(USER_INFO_KEY, JSON.stringify(state));
    },
  },
});

export const {
  login,
  logout,
  updateEmail,
  updateProfile,
  clearUnReadNotificationCount,
} = userSlice.actions;

export default userSlice.reducer;
