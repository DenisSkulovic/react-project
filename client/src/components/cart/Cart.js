import React from "react";
import CartList from "./CartList";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import "./Cart.scss";
import { useSelector } from "react-redux";

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
