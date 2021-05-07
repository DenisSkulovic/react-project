import React from "react";
import CartItem from "./CartItem";

export default function CartList({ cartItems }) {
  return (
    <div className="cart-list">
      <h4>Cart List</h4>
      {cartItems.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
    </div>
  );
}
