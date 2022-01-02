import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  severity: 'info',
  message: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, { payload: { severity, message } }) => {
      state.severity = severity;
      state.message = message;
    },
    clearNotification: (state) => {
      state.severity = '';
      state.message = '';
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
