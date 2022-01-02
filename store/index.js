import { configureStore } from '@reduxjs/toolkit';

import themeReducer from './theme';
import authReducer from './auth';
import notificationReducer from './notification';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    notification: notificationReducer,
  },
});

export default store;
