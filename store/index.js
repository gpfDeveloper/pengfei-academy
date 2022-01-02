import { configureStore } from '@reduxjs/toolkit';

import themeReducer from './theme';
import authReducer from './auth';
import snackbarReducer from './snackbar';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    snackbar: snackbarReducer,
  },
});

export default store;
