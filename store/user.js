import { createSlice } from '@reduxjs/toolkit';
import { SESSION_EXPIRE_SEC } from 'utils/constants';
import Cookies from 'js-cookie';

const USER_INFO_KEY = 'userInfo';

let initialState = {
  isLogin: false,
  isInstructor: false,
  isAdmin: false,
  name: '',
  id: '',
  email: '',
  token: '',
  unReadNotificationCount: 0,
  unReadMsgCount: 0,
  expireAt: null,
  wishlist: [],
  learningList: [],
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
          id,
          name,
          email,
          token,
          isAdmin,
          isInstructor,
          wishlist,
          learningList,
        },
      }
    ) => {
      state.id = id;
      state.isLogin = true;
      state.isAdmin = isAdmin;
      state.isInstructor = isInstructor;
      state.name = name;
      state.email = email;
      state.token = token;
      state.expireAt = new Date().getTime() + SESSION_EXPIRE_SEC * 1000;
      state.wishlist = wishlist;
      state.learningList = learningList;
      Cookies.set(USER_INFO_KEY, JSON.stringify(state));
    },
    logout: (state) => {
      state.isLogin = false;
      state.isAdmin = false;
      state.isInstructor = false;
      state.id = '';
      state.name = '';
      state.email = '';
      state.token = '';
      state.unReadNotificationCount = 0;
      state.unReadMsgCount = 0;
      state.expireAt = null;
      state.wishlist = [];
      state.learningList = [];
      Cookies.remove(USER_INFO_KEY);
    },
    updateEmail: (state, { payload: email }) => {
      state.email = email;
      Cookies.set(USER_INFO_KEY, JSON.stringify(state));
    },
    updateName: (state, { payload: { name } }) => {
      state.name = name;
      Cookies.set(USER_INFO_KEY, JSON.stringify(state));
    },
    clearUnReadNotificationCount: (state) => {
      state.unReadNotificationCount = 0;
      Cookies.set(USER_INFO_KEY, JSON.stringify(state));
    },
    clearUnReadMsgCount: (state) => {
      state.unReadMsgCount = 0;
      Cookies.set(USER_INFO_KEY, JSON.stringify(state));
    },
    getHeaderInfo: (
      state,
      { payload: { unReadNotificationCount, unReadMsgCount, isInstructor } }
    ) => {
      state.unReadNotificationCount = unReadNotificationCount;
      state.unReadMsgCount = unReadMsgCount;
      state.isInstructor = isInstructor;
      Cookies.set(USER_INFO_KEY, JSON.stringify(state));
    },
    addToWishlist: (state, { payload }) => {
      if (state.wishlist.indexOf(payload) === -1) {
        state.wishlist.push(payload);
        Cookies.set(USER_INFO_KEY, JSON.stringify(state));
      }
    },
    removeFromWishlist: (state, { payload }) => {
      state.wishlist = state.wishlist.filter((id) => id !== payload);
      Cookies.set(USER_INFO_KEY, JSON.stringify(state));
    },
    enrollment: (state, { payload }) => {
      if (state.learningList.indexOf(payload) === -1) {
        state.learningList.push(payload);
        Cookies.set(USER_INFO_KEY, JSON.stringify(state));
      }
    },
  },
});

export const {
  login,
  logout,
  updateEmail,
  updateName,
  clearUnReadNotificationCount,
  clearUnReadMsgCount,
  getHeaderInfo,
  addToWishlist,
  removeFromWishlist,
  enrollment,
} = userSlice.actions;

export default userSlice.reducer;
