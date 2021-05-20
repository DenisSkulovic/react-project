import { createSelector } from "reselect";

const state_isAuthenticated = (state) => {
  return state.UserReducer.isAuthenticated;
};

export const makeSelect_isAuthenticated = createSelector(
  state_isAuthenticated,
  (status) => {
    return { isAuthenticated: status };
  }
);
