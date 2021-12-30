import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDark: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDark: (state) => {
      state.isDark = true;
    },
    setLight: (state) => {
      state.isDark = false;
    },
  },
});

export const { setDark, setLight } = themeSlice.actions;

export default themeSlice.reducer;
