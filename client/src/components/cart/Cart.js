import React from "react";
import CartList from "./CartList";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import "./Cart.scss";

export default function Cart() {
  return (
    <div className="cart-wrapper">
      <div className="cart">
        <TopNav />
        <CartList />
        <BottomNav />
      </div>
    </div>
  );
}
