import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalCount: 0,
  notification: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
        state.notification = {
          id: Date.now(),
          productName: product.name,
          quantity: existingItem.quantity,
          isNew: false,
        };
      } else {
        state.items.push({ ...product, quantity: 1 });
        state.notification = {
          id: Date.now(),
          productName: product.name,
          quantity: 1,
          isNew: true,
        };
      }

      state.totalCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      state.totalCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
      state.totalCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.notification = null;
    },
    dismissNotification: (state) => {
      state.notification = null;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, dismissNotification } =
  cartSlice.actions;

export const selectCartCount = (state) => state.cart?.totalCount || 0;
export const selectCartItems = (state) => state.cart?.items || [];
export const selectCartNotification = (state) => state.cart?.notification || null;
export const selectCartSubtotal = (state) =>
  (state.cart?.items || []).reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;
