import axios from 'axios';

import {
  updateCourse,
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
} from './course';
import { setSnackbar } from './snackbar';

import { COURSE_REVIEW_STATUS } from 'utils/constants';

export const createCourseAsync =
  ({ title, token }) =>
  async (dispatch) => {
    try {
      const data = await axios.post(
        '/api/instructor/course',
        {
          title,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      //Need to return course since we need id to redirect
      return data.data.course;
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Course created failed, please try again later.',
        })
      );
    }
  };

export const getMyCourseAsync =
  ({ courseId, token }) =>
  async (dispatch) => {
    try {
      const data = await axios.get(`/api/instructor/course/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(updateCourse(data.data.course));
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Get course failed, please try again later.',
        })
      );
    }
  };

export const deleteMyCourseAsync =
  ({ courseId, token }) =>
  async (dispatch) => {
    try {
      await axios.delete(`/api/instructor/course/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(
        setSnackbar({ severity: 'success', message: 'Delete success.' })
      );
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Delete course failed, please try again later.',
        })
      );
      return false;
    }
  };

export const updateMyCourseBasicInfoAsync =
  ({
    courseId,
    token,
    title,
    subtitle,
    description,
    language,
    category,
    subcategory,
  }) =>
  async (dispatch) => {
    try {
      await axios.put(
        `/api/instructor/course/${courseId}/updateBasicInfo`,
        { title, subtitle, description, language, category, subcategory },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        updateCourse({
          title,
          subtitle,
          description,
          language,
          category,
          subcategory,
        })
      );
      dispatch(
        setSnackbar({ severity: 'success', message: 'Update success.' })
      );
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Update failed, please try again later.',
        })
      );
    }
  };

export const updateMyCourseMsgAsync =
  ({ courseId, token, welcomeMsg }) =>
  async (dispatch) => {
    try {
      await axios.put(
        `/api/instructor/course/${courseId}/updateMsg`,
        { welcomeMsg },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        updateCourse({
          welcomeMsg,
        })
      );
      dispatch(
        setSnackbar({ severity: 'success', message: 'Update success.' })
      );
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Update failed, please try again later.',
        })
      );
    }
  };

export const updateMyCourseLearningObjectivesAsync =
  ({ courseId, token, learningObjectives }) =>
  async (dispatch) => {
    try {
      await axios.put(
        `/api/instructor/course/${courseId}/updateLearningObjectives`,
        { learningObjectives },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        updateCourse({
          learningObjectives,
        })
      );
      dispatch(
        setSnackbar({ severity: 'success', message: 'Update success.' })
      );
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Update failed, please try again later.',
        })
      );
    }
  };

export const updateMyCoursePrerequisitesAsync =
  ({ courseId, token, prerequisites }) =>
  async (dispatch) => {
    try {
      await axios.put(
        `/api/instructor/course/${courseId}/updatePrerequisites`,
        { prerequisites },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        updateCourse({
          prerequisites,
        })
      );
      dispatch(
        setSnackbar({ severity: 'success', message: 'Update success.' })
      );
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Update failed, please try again later.',
        })
      );
    }
  };

export const updateMyCourseForWhoAsync =
  ({ courseId, token, courseForWho }) =>
  async (dispatch) => {
    try {
      await axios.put(
        `/api/instructor/course/${courseId}/updateCourseForWho`,
        { courseForWho },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        updateCourse({
          courseForWho,
        })
      );
      dispatch(
        setSnackbar({ severity: 'success', message: 'Update success.' })
      );
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Update failed, please try again later.',
        })
      );
    }
  };

export const updateMyCoursePriceAsync =
  ({ courseId, token, price }) =>
  async (dispatch) => {
    try {
      await axios.put(
        `/api/instructor/course/${courseId}/updatePrice`,
        { price },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        updateCourse({
          price,
        })
      );
      dispatch(
        setSnackbar({ severity: 'success', message: 'Update success.' })
      );
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Update failed, please try again later.',
        })
      );
    }
  };

export const createCourseSectionAsync =
  ({ courseId, token, title }) =>
  async (dispatch) => {
    try {
      const data = await axios.post(
        `/api/instructor/course/${courseId}/section`,
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(createCourseSection(data.data.courseSection));
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message:
            message || 'Create course section failed, please try again later.',
        })
      );
    }
  };

export const deleteCourseSectionAsync =
  ({ courseId, sectionId, token }) =>
  async (dispatch) => {
    try {
      await axios.delete(
        `/api/instructor/course/${courseId}/section/${sectionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(deleteCourseSection(sectionId));
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message:
            message || 'Delete course section failed, please try again later.',
        })
      );
    }
  };

export const editCourseSectionAsync =
  ({ courseId, sectionId, token, title }) =>
  async (dispatch) => {
    try {
      await axios.put(
        `/api/instructor/course/${courseId}/section/${sectionId}`,
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(editCourseSection({ title, sectionId }));
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message:
            message || 'Edit course section failed, please try again later.',
        })
      );
    }
  };

export const createLectureAsync =
  ({ courseId, sectionId, token, title }) =>
  async (dispatch) => {
    try {
      const data = await axios.post(
        `/api/instructor/course/${courseId}/section/${sectionId}/lecture`,
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(createLecture({ sectionId, lecture: data.data.lecture }));
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Create lecture failed, please try again later.',
        })
      );
    }
  };

export const deleteLectureAsync =
  ({ courseId, sectionId, lectureId, token }) =>
  async (dispatch) => {
    try {
      await axios.delete(
        `/api/instructor/course/${courseId}/section/${sectionId}/lecture/${lectureId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(deleteLecture({ sectionId, lectureId }));
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Delete lecture failed, please try again later.',
        })
      );
    }
  };

export const editLectureAsync =
  ({ courseId, sectionId, lectureId, token, title, contentType, article }) =>
  async (dispatch) => {
    try {
      const data = await axios.put(
        `/api/instructor/course/${courseId}/section/${sectionId}/lecture/${lectureId}`,
        { title, contentType, article },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        editLecture({ sectionId, lectureId, lecture: data.data.lecture })
      );
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Update lecture failed, please try again later.',
        })
      );
    }
  };

export const dragDropCourseSectionAsync =
  ({ sectionDragIdx, sectionDropIdx, courseId, token }) =>
  async (dispatch) => {
    try {
      await axios.put(
        `/api/instructor/course/${courseId}/section/dragDrop`,
        { sectionDragIdx, sectionDropIdx },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(dragDropSection({ sectionDragIdx, sectionDropIdx }));
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Reorder section failed, please try again later.',
        })
      );
    }
  };

export const dragDropLectureSameSectionAsync =
  ({
    sectionIdx,
    sectionId,
    lectureDragIdx,
    lectureDropIdx,
    courseId,
    token,
  }) =>
  async (dispatch) => {
    try {
      await axios.put(
        `/api/instructor/course/${courseId}/section/dragDropLectureSameSection`,
        { sectionId, lectureDragIdx, lectureDropIdx },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        dragDropLectureSameSection({
          sectionIdx,
          lectureDragIdx,
          lectureDropIdx,
        })
      );
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Reorder lecture failed, please try again later.',
        })
      );
    }
  };

export const dragDropLectureOtherSectionAsync =
  ({
    sectionDragId,
    sectionDropId,
    sectionDragIdx,
    sectionDropIdx,
    lectureDragIdx,
    lectureDropIdx,
    courseId,
    token,
  }) =>
  async (dispatch) => {
    try {
      await axios.put(
        `/api/instructor/course/${courseId}/section/dragDropLectureOtherSection`,
        { sectionDragId, sectionDropId, lectureDragIdx, lectureDropIdx },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        dragDropLectureOtherSection({
          sectionDragIdx,
          sectionDropIdx,
          lectureDragIdx,
          lectureDropIdx,
        })
      );
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Reorder lecture failed, please try again later.',
        })
      );
    }
  };

export const submitForReviewAsync =
  ({ courseId, token }) =>
  async (dispatch) => {
    try {
      await axios.get(`/api/instructor/course/${courseId}/submitForReview`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(updateReviewStatus(COURSE_REVIEW_STATUS.reviewing));
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message:
            message || 'Submit for review failed, please try again later.',
        })
      );
    }
  };
