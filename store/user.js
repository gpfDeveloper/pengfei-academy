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
      { payload: { id, name, email, token, isAdmin, isInstructor, wishlist } }
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
} = userSlice.actions;

export default userSlice.reducer;
