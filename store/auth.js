import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const USER_INFO_KEY = 'userInfo';

let initialState = {
  isLogin: false,
  id: null,
  name: null,
  token: null,
};

const userInfo = Cookies.get(USER_INFO_KEY);
if (userInfo) {
  initialState = JSON.parse(userInfo);
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload: { id, name, token } }) => {
      state.isLogin = true;
      state.id = id;
      state.name = name;
      state.token = token;
      Cookies.set(USER_INFO_KEY, JSON.stringify(state));
    },
    logout: (state) => {
      state.isLogin = false;
      state.id = null;
      state.name = null;
      state.token = null;
      Cookies.remove(USER_INFO_KEY);
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
