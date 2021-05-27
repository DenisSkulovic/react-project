import ActionTypes from "./constants";

const defaultStore = {
  isAuthenticated: false,
  email: "",
};

export function UserReducer(state = defaultStore, action) {
  switch (action.type) {
    case ActionTypes.AUTHENTICATION_STATUS:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case ActionTypes.SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
}
