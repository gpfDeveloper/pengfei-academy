import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const USER_INFO_KEY = 'userInfo';

let initialState = {
  isLogin: false,
  role: [],
  name: null,
  email: null,
  token: null,
};

const userInfo = Cookies.get(USER_INFO_KEY);
if (userInfo) {
  initialState = JSON.parse(userInfo);
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload: { name, email, token, role } }) => {
      state.isLogin = true;
      state.name = name;
      state.email = email;
      state.role = role;
      state.token = token;
      Cookies.set(USER_INFO_KEY, JSON.stringify(state));
    },
    logout: (state) => {
      state.isLogin = false;
      state.name = null;
      state.email = null;
      state.role = [];
      state.token = null;
      Cookies.remove(USER_INFO_KEY);
    },
    updateEmail: (state, { payload: { email } }) => {
      state.email = email;
    },
  },
});

export const { login, logout, updateEmail } = userSlice.actions;

export default userSlice.reducer;
