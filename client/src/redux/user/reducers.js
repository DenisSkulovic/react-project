import ActionTypes from "./constants";

const defaultStore = {
  isAuthenticated: false,
};

export function UserReducer(state = defaultStore, action) {
  switch (action.type) {
    case ActionTypes.AUTHENTICATION_STATUS:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
}
