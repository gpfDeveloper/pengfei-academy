import axios from 'axios';

import { login, logout, updateEmail, updateProfile } from 'store/user';
import { clear as clearTeaching } from './teaching';
import { setSnackbar } from './snackbar';

export const loginAsync =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const data = await axios.post('/api/user/login', { email, password });
      const { token, name, roles, headline, bio } = data.data;
      dispatch(login({ token, name, email, roles, headline, bio }));
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

export const logoutAsync = () => async (dispatch) => {
  dispatch(logout());
  dispatch(clearTeaching());
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
      const { token, name, roles } = data.data;
      dispatch(login({ token, name, email, roles }));
      dispatch(
        setSnackbar({
          severity: 'success',
          message: 'Welcome to Pengfei Academy!',
        })
      );
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Register failed, please try again later',
        })
      );
      return false;
    }
  };

export const accountSecurityUpdate =
  ({ currentPassword, newPassword, email, token }) =>
  async (dispatch) => {
    try {
      await axios.put(
        '/api/user/accountSecurity',
        {
          currentPassword,
          newPassword,
          email,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(updateEmail(email));
      dispatch(setSnackbar({ severity: 'success', message: 'Update success' }));
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Update failed, please try again later',
        })
      );
    }
  };

export const profileInfoUpdate =
  ({ name, bio, headline, token }) =>
  async (dispatch) => {
    try {
      await axios.put(
        '/api/user/profileInfo',
        {
          name,
          bio,
          headline,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(updateProfile({ name, headline, bio }));
      dispatch(setSnackbar({ severity: 'success', message: 'Update success' }));
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Update failed, please try again later',
        })
      );
    }
  };
