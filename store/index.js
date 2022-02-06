import { configureStore } from '@reduxjs/toolkit';

import themeReducer from './theme';
import userReducer from './user';
import snackbarReducer from './snackbar';
import teachingReducer from './teaching';
import courseReducer from './course';
import cartReducer from './cart';

const store = configureStore({
  reducer: {
    course: courseReducer,
    theme: themeReducer,
    user: userReducer,
    snackbar: snackbarReducer,
    teaching: teachingReducer,
    cart: cartReducer,
  },
});

export default store;
