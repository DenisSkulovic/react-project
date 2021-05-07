import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function BottomNav() {
  return (
    <div className="cart-bottom-nav-wrapper">
      <div className="cart-bottom-nav">
        <div className="total-amount">
          <span>$3.50</span>
        </div>
        <Button variant={"success"} className="checkout-btn" block>
          <Link to="/checkout">Checkout</Link>
        </Button>
      </div>
    </div>
  );
}
