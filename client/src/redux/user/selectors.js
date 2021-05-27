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

const state_Users_email = (state) => {
  return state.UserReducer.email;
};
export const makeSelect_Users_email = createSelector(state_Users_email, (e) => {
  return { email: e };
});
