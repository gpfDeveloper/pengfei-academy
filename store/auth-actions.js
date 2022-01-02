import { login } from 'store/auth';
import axios from 'axios';

export const loginAsync =
  ({ email, password }) =>
  async (dispatch) => {
    const data = await axios.post('/api/user/login', { email, password });
    const { id, token, name } = data.data;
    dispatch(login({ id, token, name }));
  };
