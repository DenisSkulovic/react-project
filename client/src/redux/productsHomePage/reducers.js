import ActionTypes from "./constants";

const defaultStore = {
  products: [],
};

export function HomeReducer(state = defaultStore, action) {
  switch (action.type) {
    case ActionTypes.GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
}
