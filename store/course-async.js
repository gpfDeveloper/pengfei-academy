import axios from 'axios';

import { updateCourse } from './course';
import { setSnackbar } from './snackbar';

export const createAsync =
  ({ title, token }) =>
  async (dispatch) => {
    try {
      const data = await axios.post(
        '/api/instructor/course/create',
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
