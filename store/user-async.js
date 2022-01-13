import axios from 'axios';

import {
  login,
  logout,
  updateEmail,
  updateProfile,
  clearUnReadNotificationCount,
  clearUnReadMsgCount,
  getHeaderInfo,
} from 'store/user';
import { clear as clearTeaching } from './teaching';
import { setSnackbar } from './snackbar';

export const loginAsync =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const data = await axios.post('/api/user/login', { email, password });
      const {
        token,
        id,
        name,
        headline,
        bio,
        unReadNotificationCount,
        isAdmin,
        isInstructor,
      } = data.data;
      dispatch(
        login({
          token,
          id,
          name,
          email,
          headline,
          bio,
          unReadNotificationCount,
          isAdmin,
          isInstructor,
        })
      );
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
      const {
        token,
        id,
        name,
        unReadNotificationCount,
        isAdmin,
        isInstructor,
      } = data.data;
      dispatch(
        login({
          token,
          id,
          name,
          email,
          unReadNotificationCount,
          isAdmin,
          isInstructor,
        })
      );
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

export const accountSecurityUpdateAsync =
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

export const profileInfoUpdateAsync =
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

export const clearUnReadNotificationCountAsync =
  (token) => async (dispatch) => {
    try {
      await axios.get('/api/notification/clearUnReadCount', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(clearUnReadNotificationCount());
    } catch (error) {
      console.log(error);
    }
  };

export const clearUnReadMsgCountAsync = (token) => async (dispatch) => {
  try {
    await axios.get('/api/message/clearUnReadCount', {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(clearUnReadMsgCount());
  } catch (error) {
    console.log(error);
  }
};

export const getHeaderInfoAsync = (token) => async (dispatch) => {
  try {
    const data = await axios.get('/api/user/headerInfo', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { unReadNotificationCount, unReadMsgCount, isInstructor } = data.data;
    dispatch(
      getHeaderInfo({ unReadNotificationCount, unReadMsgCount, isInstructor })
    );
  } catch (error) {
    console.log(error);
  }
};
