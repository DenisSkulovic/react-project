import { createSelector } from "reselect";

const state_Cart_cartItems = (state) => state.CartReducer.cart;

export const makeSelect_Cart_cartItems = createSelector(
  state_Cart_cartItems,
  (cart) => {
    return { cart_items: cart };
  }
);
