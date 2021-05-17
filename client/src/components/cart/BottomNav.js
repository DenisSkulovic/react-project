import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { makeSelect_Cart_cartTotal } from "../../redux/cart/selectors";

export default function BottomNav() {
  const totalSelector = useSelector(makeSelect_Cart_cartTotal);

  return (
    <div className="cart-bottom-nav-wrapper">
      <div className="cart-bottom-nav">
        <div className="total-amount">
          <span>${totalSelector.cart_total.toFixed(2)}</span>
        </div>
        <Button variant={"success"} className="checkout-btn" block>
          <Link to="/checkout">Checkout</Link>
        </Button>
      </div>
    </div>
  );
}
