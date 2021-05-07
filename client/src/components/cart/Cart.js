import React from "react";
import CartList from "./CartList";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import "./Cart.scss";

export default function Cart({ cartItems }) {
  // const addToCart = (itemID, quantity) => {
  //     console.log("addToCart TO DO")
  // }

  return (
    <div className="cart-wrapper">
      <div className="cart">
        <TopNav />
        <CartList cartItems={cartItems} />
        <BottomNav />
      </div>
    </div>
  );
}
