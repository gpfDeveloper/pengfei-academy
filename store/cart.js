import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const CART_INFO_KEY = 'cartInfo';

let initialState = {
  subtotal: 0,
  items: [],
};

const cartInfo = Cookies.get(CART_INFO_KEY);
if (cartInfo) {
  initialState = JSON.parse(cartInfo);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload: { courseId, title, author, price } }) => {
      const isExist =
        state.items.findIndex((item) => item.courseId === courseId) !== -1;
      if (isExist) return;
      state.items.push({ courseId, title, author, price });
      state.subtotal += price;
      state.subtotal = Math.round(state.subtotal * 100) / 100;
      Cookies.set(CART_INFO_KEY, JSON.stringify(state));
    },
    removeFromCart: (state, { payload }) => {
      const itemIdx = state.items.findIndex(
        (item) => item.courseId === payload
      );
      if (itemIdx === -1) return;
      state.subtotal -= state.items[itemIdx].price;
      state.subtotal = Math.round(state.subtotal * 100) / 100;
      state.items.splice(itemIdx, 1);
      if (state.items.length === 0) {
        state.subtotal = 0;
      }
      Cookies.set(CART_INFO_KEY, JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
