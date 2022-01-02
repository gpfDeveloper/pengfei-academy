import axios from 'axios';

import { login } from 'store/auth';
import { setSnackbar } from './snackbar';

export const loginAsync =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const data = await axios.post('/api/user/login', { email, password });
      const { id, token, name } = data.data;
      dispatch(login({ id, token, name }));
      dispatch(setSnackbar({ severity: 'success', message: 'Login success.' }));
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Login failed, please try again later',
        })
      );
      return false;
    }
  };
