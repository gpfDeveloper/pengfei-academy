import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    create: (state, { payload }) => {
      state.title = payload;
    },
  },
});

export const { create } = courseSlice.actions;

export default courseSlice.reducer;
