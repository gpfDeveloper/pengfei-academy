import { createSlice } from '@reduxjs/toolkit';

import { TEACHING_STATUS } from 'utils/constants';

const { signup, sendRequest, haveMeeting, complete } = TEACHING_STATUS;

let initialState = {
  status: signup,
  message: '',
  skypeName: '',
};

const teachingSlicer = createSlice({
  name: 'teaching',
  initialState,
  reducers: {
    setStatusSendRequest: (state) => {
      state.status = sendRequest;
    },
    setStatusHaveMeeting: (state, { payload: { skypeName, message } }) => {
      state.status = haveMeeting;
      state.message = message;
      state.skypeName = skypeName;
    },
    setStatusComplete: (state) => {
      state.status = complete;
    },
  },
});

export const { setStatusSendRequest, setStatusHaveMeeting, setStatusComplete } =
  teachingSlicer.actions;

export default teachingSlicer.reducer;
