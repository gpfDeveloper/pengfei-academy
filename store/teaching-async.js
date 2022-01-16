import axios from 'axios';

import { setStatusHaveMeeting } from './teaching';
import { setSnackbar } from './snackbar';

export const sendRequestAsync =
  ({ message, token }) =>
  async (dispatch) => {
    try {
      await axios.post(
        '/api/teaching/sendRequest',
        {
          message,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setStatusHaveMeeting());
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Request send failed, please try again later.',
        })
      );
    }
  };
