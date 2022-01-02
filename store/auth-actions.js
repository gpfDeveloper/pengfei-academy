import axios from 'axios';

import { login } from 'store/auth';
import { setNotification } from './notification';

export const loginAsync =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const data = await axios.post('/api/user/login', { email, password });
      const { id, token, name } = data.data;
      dispatch(login({ id, token, name }));
      dispatch(
        setNotification({ severity: 'success', message: 'Login success.' })
      );
    } catch (error) {
      const message = error.response.data.message;
      dispatch(setNotification({ severity: 'error', message }));
    }
  };
