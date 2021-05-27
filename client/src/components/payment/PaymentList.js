import "./PaymentList.scss";
import React, { useState } from "react";
import PaymentDetail from "./PaymentDetail";
import { useDispatch } from "react-redux";
import { setCollapseAll, setOpenAll } from "../../redux/history/actions";

export default function PaymentList({ payments }) {
  const [toggleBtnOpen, setToggleBtnOpen] = useState(true);

  const dispatch = useDispatch();
  const handleClick = () => {
    if (
      document.querySelector(".collapse-all-btn").classList.contains("open")
    ) {
      setToggleBtnOpen(false);
      dispatch(setCollapseAll());
      return;
    }
    if (
      document.querySelector(".collapse-all-btn").classList.contains("close")
    ) {
      setToggleBtnOpen(true);
      dispatch(setOpenAll());
      return;
    }
  };
  return (
    <div className="container payment-list-wrapper">
      <div className="payment-history-title">Payment History</div>
      <div
        className={`collapse-all-btn ${toggleBtnOpen ? "open" : "close"}`}
        onClick={() => handleClick()}
      >
        {toggleBtnOpen ? "collapse all" : "open all"}
      </div>
      <div className="payment-list">
        {payments &&
          payments.map((payment, i) => {
            return <PaymentDetail key={i} payment={payment} />;
          })}
      </div>
    </div>
  );
}
