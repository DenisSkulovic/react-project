import { createSelector } from "reselect";

const state_ProductDetail_product = (state) =>
  state.ProductDetailReducer.product;
const state_ProductDetail_open = (state) => state.ProductDetailReducer.open;
const state_ProductDetail_quantityInputValue = (state) =>
  state.ProductDetailReducer.quantity_input_value;

export const makeSelect_ProductDetail_product = createSelector(
  state_ProductDetail_product,
  (prod) => {
    return { product: prod };
  }
);

export const makeSelect_ProductDetail_open = createSelector(
  state_ProductDetail_open,
  (open_bool) => {
    return { open: open_bool };
  }
);

export const makeSelect_ProductDetail_quantityInputValue = createSelector(
  state_ProductDetail_quantityInputValue,
  (q) => {
    return { quantity_input_value: q };
  }
);
