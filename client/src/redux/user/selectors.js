import { createSelector } from "reselect";

const state_User_session_key = (state) => state.UserReducer.products;

export const makeSelect_User_session_key = createSelector(
  state_User_session_key,
  (key) => {
    return { session_key: key };
  }
);
