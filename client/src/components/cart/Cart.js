import React from "react";
import CartList from "./CartList";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import "./cart.scss";

export default function Cart({ cartItems }) {
  // const addToCart = (itemID, quantity) => {
  //     console.log("addToCart TO DO")
  // }

  return (
    <div className="cart">
      <h3>Cart</h3>
      <TopNav />
      <CartList cartItems={cartItems} />
      <BottomNav />
    </div>
  );
}
