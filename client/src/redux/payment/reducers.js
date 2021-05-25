import ActionTypes from "./constants";

const defaultStore = {
  processing: false,
  payment: {},
  payment_history: [],
};

export function PaymentReducer(state = defaultStore, action) {
  switch (action.type) {
    case ActionTypes.SET_PROCESSING:
      return {
        ...state,
        processing: action.payload,
      };
    case ActionTypes.SET_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };
    case ActionTypes.SET_PAYMENT_HISTORY:
      return {
        ...state,
        payment_history: action.payload,
      };
    default:
      return state;
  }
}
