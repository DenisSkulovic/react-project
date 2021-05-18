import { createSelector } from "reselect";

const stateAllProducts_products = (state) => state.AllProductsReducer.products;
const stateAllProducts_category = (state) => state.AllProductsReducer.category;
const stateAllProducts_categories = (state) =>
  state.AllProductsReducer.categories;
const stateAllProducts_order_by = (state) => state.AllProductsReducer.order_by;

export const makeSelect_AllProducts_products = createSelector(
  stateAllProducts_products,
  (prods) => {
    return { products: prods };
  }
);

export const makeSelect_AllProducts_category = createSelector(
  stateAllProducts_category,
  (cat) => {
    return { category: cat };
  }
);

export const makeSelect_AllProducts_categories = createSelector(
  stateAllProducts_categories,
  (cats) => {
    return { categories: cats };
  }
);

export const makeSelect_AllProducts_order_by = createSelector(
  stateAllProducts_order_by,
  (ordby) => {
    return { order_by: ordby };
  }
);
