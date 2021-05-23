import ActionTypes from "./constants";

const defaultStore = {
  products: {},
  category: "all",
  categories: [],
  order_by: "name",
  page: 1,
  page_size: 15,
  loading: true,
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
    case ActionTypes.SET_ORDER_BY:
      return {
        ...state,
        order_by: action.payload,
      };
    case ActionTypes.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
