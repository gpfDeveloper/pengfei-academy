import { createSlice } from '@reduxjs/toolkit';

import { TEACHING_STATUS } from 'utils/constants';

const { signup, sendRequest, haveMeeting } = TEACHING_STATUS;

let initialState = {
  status: signup,
};

const teachingSlicer = createSlice({
  name: 'teaching',
  initialState,
  reducers: {
    setStatusSendRequest: (state) => {
      state.status = sendRequest;
    },
    setStatusHaveMeeting: (state) => {
      state.status = haveMeeting;
    },
    clear: (state) => {
      state.status = signup;
    },
  },
});

export const { setStatusSendRequest, setStatusHaveMeeting, clear } =
  teachingSlicer.actions;

export default teachingSlicer.reducer;
