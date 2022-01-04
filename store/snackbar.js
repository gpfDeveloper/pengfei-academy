import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  severity: undefined,
  message: '',
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbar: (state, { payload: { severity, message } }) => {
      state.severity = severity;
      state.message = message;
    },
    clearSnackbar: (state) => {
      state.severity = undefined;
      state.message = '';
    },
  },
});

export const { setSnackbar, clearSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
