import { configureStore } from '@reduxjs/toolkit';

import themeReducer from './theme';
import userReducer from './user';
import snackbarReducer from './snackbar';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    snackbar: snackbarReducer,
  },
});

export default store;
