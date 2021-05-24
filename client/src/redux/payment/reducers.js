import ActionTypes from "./constants";

const defaultStore = {
  processing: false,
};

export function CartReducer(state = defaultStore, action) {
  switch (action.type) {
    case ActionTypes.SET_PROCESSING:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
}
