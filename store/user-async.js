import axios from 'axios';

import { login, updateEmail } from 'store/user';
import { setSnackbar } from './snackbar';

export const loginAsync =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const data = await axios.post('/api/user/login', { email, password });
      const { token, name, role } = data.data;
      dispatch(login({ token, name, email, role }));
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

export const registerAsync =
  ({ name: inputName, email, password }) =>
  async (dispatch) => {
    try {
      const data = await axios.post('/api/user/register', {
        name: inputName,
        email,
        password,
      });
      const { token, name, role } = data.data;
      dispatch(login({ token, name, email, role }));
      dispatch(
        setSnackbar({ severity: 'success', message: 'register success.' })
      );
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'register failed, please try again later',
        })
      );
      return false;
    }
  };

export const accountSecurityUpdate =
  ({ currentPassword, newPassword, email }) =>
  async (dispatch) => {
    console.log(currentPassword, newPassword, email);
    dispatch(updateEmail(email));
  };
