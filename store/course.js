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
  isPublished: false,
  reviewStatus: '',
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
    editLecture: (state, { payload: { lectureId, sectionId, lecture } }) => {
      const sectionIdx = state.sections.findIndex(
        (section) => section.id === sectionId
      );
      const lectureIdx = state.sections[sectionIdx].lectures.findIndex(
        (_lecture) => _lecture.id === lectureId
      );
      state.sections[sectionIdx].lectures[lectureIdx] = lecture;
    },
    dragDropSection: (
      state,
      { payload: { sectionDragIdx, sectionDropIdx } }
    ) => {
      const section = state.sections[sectionDragIdx];
      state.sections.splice(sectionDragIdx, 1);
      state.sections.splice(sectionDropIdx, 0, section);
    },
    dragDropLectureSameSection: (
      state,
      { payload: { sectionIdx, lectureDragIdx, lectureDropIdx } }
    ) => {
      const lectures = state.sections[sectionIdx].lectures;
      const lecuture = lectures[lectureDragIdx];
      lectures.splice(lectureDragIdx, 1);
      lectures.splice(lectureDropIdx, 0, lecuture);
    },
    dragDropLectureOtherSection: (
      state,
      {
        payload: {
          sectionDragIdx,
          sectionDropIdx,
          lectureDragIdx,
          lectureDropIdx,
        },
      }
    ) => {
      const lecturesDrag = state.sections[sectionDragIdx].lectures;
      const lecturesDrop = state.sections[sectionDropIdx].lectures;
      const lecuture = lecturesDrag[lectureDragIdx];
      lecturesDrag.splice(lectureDragIdx, 1);
      lecturesDrop.splice(lectureDropIdx, 0, lecuture);
    },
    updateReviewStatus: (state, { payload }) => {
      state.reviewStatus = payload;
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
  editLecture,
  dragDropSection,
  dragDropLectureSameSection,
  dragDropLectureOtherSection,
  updateReviewStatus,
} = courseSlice.actions;

export default courseSlice.reducer;
