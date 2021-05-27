import { createSelector } from "reselect";

const state_History_collapse_all = (state) => state.HistoryReducer.collapse_all;
export const makeSelect_History_collapse_all = createSelector(
  state_History_collapse_all,
  (x) => {
    return { collapse_all: x };
  }
);

const state_History_open_all = (state) => state.HistoryReducer.open_all;
export const makeSelect_History_open_all = createSelector(
  state_History_open_all,
  (x) => {
    return { open_all: x };
  }
);
