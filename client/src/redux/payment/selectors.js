import { createSelector } from "reselect";

const state_Payment_processing = (state) => state.PaymentReducer.processing;

export const makeSelect_Payment_processing = createSelector(
  state_Payment_processing,
  (x) => {
    return { processing: x };
  }
);

const state_Payment_payment = (state) => state.PaymentReducer.payment;

export const makeSelect_Payment_payment = createSelector(
  state_Payment_payment,
  (x) => {
    return { payment: x };
  }
);

const state_Payment_payment_history = (state) =>
  state.PaymentReducer.payment_history;

export const makeSelect_Payment_payment_history = createSelector(
  state_Payment_payment_history,
  (x) => {
    return { payment_history: x };
  }
);
