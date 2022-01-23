import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  title: '',
  subtitle: '',
  description: '',
  language: '',
  category: '',
  subcategory: '',
  welcomeMsg: '',
  congratulationMsg: '',
  learningObjectives: [],
  prerequisites: [],
  courseForWho: [],
  status: 0,
  price: '',
  sections: [],
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    //payload: {field1:'value1', field2: 'value2'}
    updateCourse: (state, { payload }) => {
      for (const key in initialState) {
        if (key in payload) {
          state[key] = payload[key];
        }
      }
    },
    resetCourse: (state) => {
      for (const key in initialState) {
        state[key] = initialState[key];
      }
    },
  },
});

export const { updateCourse, resetCourse } = courseSlice.actions;

export default courseSlice.reducer;
