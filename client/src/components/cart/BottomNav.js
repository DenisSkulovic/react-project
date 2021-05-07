import React from "react";
import { Link } from "react-router-dom";

export default function BottomNav() {
    return (
        <div className="cart-bottom-nav-wrapper">
            <div className="cart-bottom-nav">
                <div className="total-amount">
                    <span>$3.50</span>
                </div>
                <div className="checkout-btn">
                    <Link to="/checkout">Checkout</Link>
                </div>
            </div>
        </div>
    )
}
