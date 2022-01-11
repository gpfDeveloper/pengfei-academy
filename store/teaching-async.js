import axios from 'axios';

import { setStatusHaveMeeting } from './teaching';
import { setSnackbar } from './snackbar';

export const sendRequestAsync =
  ({ skypeName, message, token }) =>
  async (dispatch) => {
    try {
      await axios.post(
        '/api/teaching/sendRequest',
        {
          skypeName,
          message,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setStatusHaveMeeting({ skypeName, message }));
      dispatch(
        setSnackbar({
          severity: 'success',
          message:
            'Request send success, please schedule a meeting with Pengfei.',
        })
      );
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
