import ActionTypes from "./constants";

const defaultStore = {
  product: {},
  open: false,
  quantity_input_value: 0,
};

export function ProductDetailReducer(state = defaultStore, action) {
  switch (action.type) {
    case ActionTypes.OPEN_DETAIL:
      return {
        ...state,
        open: true,
      };
    case ActionTypes.CLOSE_DETAIL:
      return {
        ...state,
        open: false,
      };
    case ActionTypes.SELECT_PRODUCT_TO_DISPLAY:
      return {
        ...state,
        product: action.payload,
      };
    case ActionTypes.SET_QUANTITY_INPUT_VALUE:
      return {
        ...state,
        quantity_input_value: action.payload,
      };
    default:
      return state;
  }
}
