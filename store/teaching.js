import { createSlice } from '@reduxjs/toolkit';

import { TEACHING_STATUS } from 'utils/constants';

const { signup, sendRequest, haveMeeting, complete } = TEACHING_STATUS;

let initialState = {
  status: signup,
  message: '',
};

const teachingSlicer = createSlice({
  name: 'teaching',
  initialState,
  reducers: {
    setStatusSendRequest: (state) => {
      state.status = sendRequest;
    },
    setStatusHaveMeeting: (state, { payload: { message } }) => {
      state.status = haveMeeting;
      state.message = message;
    },
    setStatusComplete: (state) => {
      state.status = complete;
    },
    clear: (state) => {
      state.status = signup;
      state.message = '';
    },
  },
});

export const {
  setStatusSendRequest,
  setStatusHaveMeeting,
  setStatusComplete,
  clear,
} = teachingSlicer.actions;

export default teachingSlicer.reducer;
