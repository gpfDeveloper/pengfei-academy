import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  id: null,
  name: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload: { id, name, token } }) => {
      state.isLogin = true;
      state.id = id;
      state.name = name;
      state.token = token;
    },
    logout: (state) => {
      state.isLogin = false;
      state.id = null;
      state.name = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
