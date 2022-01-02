import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

let initialState = {
  isLogin: false,
  id: null,
  name: null,
  token: null,
};

const userInfo = Cookies.get('userInfo');
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
      Cookies.set('userInfo', JSON.stringify(state));
    },
    logout: (state) => {
      state.isLogin = false;
      state.id = null;
      state.name = null;
      state.token = null;
      Cookies.remove('userInfo');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
