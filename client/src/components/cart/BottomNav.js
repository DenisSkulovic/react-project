import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeSelect_Cart_cartTotal } from "../../redux/cart/selectors";
import "./BottomNav.scss";

export default function BottomNav() {
  const totalSelector = useSelector(makeSelect_Cart_cartTotal);
  const checkout =
    window.location.href.indexOf("checkout") !== -1 ? true : false;

  return (
    <div className="cart-bottom-nav-wrapper">
      <div className="cart-bottom-nav">
        <div className="total-amount">
          <span>${totalSelector.cart_total.toFixed(2)}</span>
        </div>
        {!checkout && (
          <Link className={"checkout-btn checkout"} to="/checkout">
            Checkout
          </Link>
        )}
        {checkout && <div className="checkout-btn pay">Pay</div>}
      </div>
    </div>
  );
}
