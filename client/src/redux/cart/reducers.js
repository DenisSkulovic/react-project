import ActionTypes from "./constants";

const defaultStore = {
  cart: [],
};

export function CartReducer(state = defaultStore, action) {
  switch (action.type) {
    case ActionTypes.GET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ActionTypes.ADD_REMOVE_CART_ITEM:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
}
