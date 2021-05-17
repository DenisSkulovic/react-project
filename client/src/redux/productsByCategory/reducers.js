import ActionTypes from "./constants";

const defaultStore = {
  products: [],
  category: "all",
  categories: [],
};

export function AllProductsReducer(state = defaultStore, action) {
  switch (action.type) {
    case ActionTypes.GET_PRODUCTS_FOR_CATEGORY:
      return {
        ...state,
        products: action.payload,
      };
    case ActionTypes.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case ActionTypes.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
}
