import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeSelect_Cart_cartTotal } from "../../redux/cart/selectors";
import { makeSelect_Payment_payment } from "../../redux/payment/selectors";
import "./BottomNav.scss";

export default function BottomNav() {
  const totalSelector = useSelector(makeSelect_Cart_cartTotal);
  const paymentSelector = useSelector(makeSelect_Payment_payment);

  const checkout =
    window.location.href.indexOf("checkout") !== -1 ? true : false;
  const handleClick = (e) => {
    e.preventDefault();
    if (totalSelector.cart_total > 0) {
      window.location.href = "/checkout";
    }
  };
  return (
    <div className="cart-bottom-nav-wrapper">
      <div className="cart-bottom-nav">
        <div className="bottom-btn total-amount">
          <span>${totalSelector.cart_total.toFixed(2)}</span>
        </div>
        {!checkout && (
          <Link
            className={"bottom-btn checkout-btn checkout"}
            to="/checkout"
            onClick={(e) => handleClick(e)}
          >
            Checkout
          </Link>
        )}
      </div>
    </div>
  );
}
