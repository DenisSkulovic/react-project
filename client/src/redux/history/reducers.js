import ActionTypes from "./constants";

const defaultStore = {
  collapse_all: false,
  open_all: false,
};

export function HistoryReducer(state = defaultStore, action) {
  switch (action.type) {
    case ActionTypes.SET_COLLAPSE_ALL:
      return {
        ...state,
        collapse_all: action.payload,
      };
    case ActionTypes.SET_OPEN_ALL:
      return {
        ...state,
        open_all: action.payload,
      };
    default:
      return state;
  }
}
