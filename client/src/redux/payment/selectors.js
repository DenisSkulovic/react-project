import { createSelector } from "reselect";

const state_Payment_processing = (state) => state.CartReducer.processing;

export const makeSelect_Payment_processing = createSelector(
  state_Payment_processing,
  (st) => {
    return { processing: st };
  }
);
