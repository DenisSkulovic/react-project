import { createSelector } from "reselect";

const state_Cart_cartItems = (state) => state.CartReducer.cart;
const state_Cart_cartTotal = (state) => state.CartReducer.cart_total;

export const makeSelect_Cart_cartItems = createSelector(
  state_Cart_cartItems,
  (cart) => {
    return { cart_items: cart };
  }
);

export const makeSelect_Cart_cartTotal = createSelector(
  state_Cart_cartTotal,
  (cartTotal) => {
    return { cart_total: cartTotal };
  }
);
