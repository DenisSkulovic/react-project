import { createSelector } from "reselect";

const stateHomeProducts = (state) => {
  return state.HomeReducer.products;
};
export const makeSelectProducts = createSelector(stateHomeProducts, (prods) => {
  return { products: prods };
});
