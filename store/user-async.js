import axios from 'axios';

import {
  login,
  logout,
  updateEmail,
  updateName,
  clearUnReadNotificationCount,
  clearUnReadMsgCount,
  getHeaderInfo,
  addToWishlist,
  removeFromWishlist,
  enrollment,
} from 'store/user';
import { clear as clearTeaching } from './teaching';
import { setSnackbar } from './snackbar';

export const loginAsync =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const data = await axios.post('/api/user/login', { email, password });
      const { token, id, name, isAdmin, isInstructor, wishlist, learningList } =
        data.data;
      dispatch(
        login({
          token,
          id,
          name,
          email,
          isAdmin,
          isInstructor,
          wishlist,
          learningList,
        })
      );
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
      const { token, id, name } = data.data;
      dispatch(
        login({
          token,
          id,
          name,
          email,
          isAdmin: false,
          isInstructor: false,
          wishlist: [],
          learningList: [],
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
  ({ name, bio, headline, website, token }) =>
  async (dispatch) => {
    try {
      await axios.put(
        '/api/profile',
        {
          name,
          bio,
          headline,
          website,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(updateName({ name }));
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

export const addToWishlistAsync =
  ({ courseId, token }) =>
  async (dispatch) => {
    try {
      await axios.post(
        '/api/user/wishlist',
        {
          courseId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(addToWishlist(courseId));
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Add to wishlist failed, please try again later',
        })
      );
    }
  };

export const removeFromWishlistAsync =
  ({ courseId, token }) =>
  async (dispatch) => {
    try {
      await axios.post(
        '/api/user/removeFromWishlist',
        {
          courseId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(removeFromWishlist(courseId));
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message:
            message || 'Remove from wishlist failed, please try again later',
        })
      );
    }
  };

export const enrollmentAsync =
  ({ courseId, token }) =>
  async (dispatch) => {
    try {
      await axios.post(
        '/api/user/enrollment',
        {
          courseId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(enrollment(courseId));
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      dispatch(
        setSnackbar({
          severity: 'error',
          message: message || 'Enrollment failed, please try again later',
        })
      );
      return false;
    }
  };
