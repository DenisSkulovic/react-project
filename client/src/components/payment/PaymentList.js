import "./PaymentList.scss";
import React, { useState, useEffect } from "react";
import PaymentDetail from "./PaymentDetail";
import { useSelector } from "react-redux";

export default function PaymentList({ payments }) {
  return (
    <div className="container">
      <div className="payment-list">
        {payments &&
          payments.map((payment, i) => {
            return <PaymentDetail key={i} payment={payment} />;
          })}
      </div>
    </div>
  );
}
