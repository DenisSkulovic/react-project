import React, { useState, useEffect } from "react";
import PaymentList from "../../../components/payment/PaymentList";
import "./PaymentHistory.scss";
import { useHistory } from "react-router-dom";
import { getPaymentHistory } from "../../../redux/payment/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  makeSelect_Payment_payment,
  makeSelect_Payment_payment_history,
} from "../../../redux/payment/selectors";

export default function PaymentHistory() {
  const dispatch = useDispatch();
  const paymentSelector = useSelector(makeSelect_Payment_payment);
  const paymentHistorySelector = useSelector(
    makeSelect_Payment_payment_history
  );
  const history = useHistory();

  useEffect(() => {
    if (!window.sessionStorage.getItem("Authorization")) {
      history.goBack();
    }
    dispatch(getPaymentHistory());
  }, []);

  return (
    <div className="payment-history-page">
      <div className="main with-navbar">
        <div className="container">
          {paymentHistorySelector.payment_history && (
            <PaymentList payments={paymentHistorySelector.payment_history} />
          )}
          {!paymentHistorySelector.payment_history ? (
            <div>
              <h3>No Payments to Display</h3>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
