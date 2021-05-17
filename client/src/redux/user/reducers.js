import ActionTypes from "./constants";

const defaultStore = {
  session_key: {},
};

export function UserReducer(state = defaultStore, action) {
  switch (action.type) {
    case ActionTypes.GET_SESSION_KEY:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
}
