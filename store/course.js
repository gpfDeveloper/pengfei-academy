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
    createCourseSection: (state, { payload }) => {
      state.sections.push(payload);
    },
    deleteCourseSection: (state, { payload }) => {
      state.sections = state.sections.filter(
        (section) => section.id !== payload
      );
    },
    editCourseSection: (state, { payload: { sectionId, title } }) => {
      state.sections = state.sections.map((section) => {
        if (section.id === sectionId) {
          section.title = title;
        }
        return section;
      });
    },
    createLecture: (state, { payload: { lecture, sectionId } }) => {
      const sectionIdx = state.sections.findIndex(
        (section) => section.id === sectionId
      );
      state.sections[sectionIdx].lectures.push(lecture);
    },
    deleteLecture: (state, { payload: { lectureId, sectionId } }) => {
      const sectionIdx = state.sections.findIndex(
        (section) => section.id === sectionId
      );

      state.sections[sectionIdx].lectures = state.sections[
        sectionIdx
      ].lectures.filter((lecture) => lecture.id !== lectureId);
    },
  },
});

export const {
  updateCourse,
  resetCourse,
  createCourseSection,
  deleteCourseSection,
  editCourseSection,
  createLecture,
  deleteLecture,
} = courseSlice.actions;

export default courseSlice.reducer;
