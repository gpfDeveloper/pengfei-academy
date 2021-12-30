import { configureStore } from '@reduxjs/toolkit';

import themeReducer from './theme';
import authReducer from './auth';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
  },
});

export default store;
