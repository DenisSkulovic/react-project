import { createSelector } from "reselect";

const state_Cart_cartItems = (state) => state.CartReducer.cart;
export const makeSelect_Cart_cartItems = createSelector(
  state_Cart_cartItems,
  (cart) => {
    return { cart_items: cart };
  }
);

const state_Cart_cartTotal = (state) => state.CartReducer.cart_total;
export const makeSelect_Cart_cartTotal = createSelector(
  state_Cart_cartTotal,
  (cartTotal) => {
    return { cart_total: cartTotal };
  }
);

const state_Cart_cartClass = (state) => state.CartReducer.cart_class;
export const makeSelect_Cart_cartClass = createSelector(
  state_Cart_cartClass,
  (cls) => {
    return { cart_class: cls };
  }
);

const state_Cart_cartBubbleClass = (state) =>
  state.CartReducer.cart_bubble_class;
export const makeSelect_Cart_cartBubbleClass = createSelector(
  state_Cart_cartBubbleClass,
  (cls) => {
    return { cart_bubble_class: cls };
  }
);
