import axios from 'axios';

import { create } from './course';
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
      dispatch(create(title));
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
