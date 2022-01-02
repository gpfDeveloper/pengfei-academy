import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  severity: null,
  message: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, { payload: { severity, message } }) => {
      state.severity = severity;
      state.message = message;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
