import { configureStore } from '@reduxjs/toolkit';

import themeReducer from './theme';
import userReducer from './user';
import snackbarReducer from './snackbar';
import teachingReducer from './teaching';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    snackbar: snackbarReducer,
    teaching: teachingReducer,
  },
});

export default store;
