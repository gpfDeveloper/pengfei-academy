import axios from 'axios';

import { updateCourse } from './course';
import { setSnackbar } from './snackbar';

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
  ({ courseId, token, welcomeMsg, congratulationMsg }) =>
  async (dispatch) => {
    try {
      await axios.put(
        `/api/instructor/course/${courseId}/updateMsg`,
        { welcomeMsg, congratulationMsg },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        updateCourse({
          welcomeMsg,
          congratulationMsg,
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
      console.log(data);
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

export const editCourseSectionTitleAsync =
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
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message:
            message ||
            'Edit course section title failed, please try again later.',
        })
      );
    }
  };
