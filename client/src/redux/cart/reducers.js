import ActionTypes from "./constants";

const defaultStore = {
  cart: [],
  cart_total: 0,
  cart_class: "cart-closed",
  cart_bubble_class: "cart-bubble-open",
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
    case ActionTypes.CALC_CART_TOTAL:
      return {
        ...state,
        cart_total: action.payload,
      };
    case ActionTypes.SET_CART_CLASS:
      return {
        ...state,
        cart_class: action.payload,
      };
    case ActionTypes.SET_CART_BUBBLE_CLASS:
      return {
        ...state,
        cart_bubble_class: action.payload,
      };
    default:
      return state;
  }
}
