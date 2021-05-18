import React, { useEffect } from "react";
import CartItem from "./CartItem";

import { useDispatch, useSelector } from "react-redux";

import { makeSelect_Cart_cartItems } from "../../redux/cart/selectors";

import { getCart } from "../../redux/cart/actions";

export default function CartList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const cartSelector = useSelector(makeSelect_Cart_cartItems);

  console.log("cartSelector.cart_items", cartSelector.cart_items);
  return (
    <div className="cart-list-wrapper">
      <div className="cart-list">
        {cartSelector.cart_items &&
          cartSelector.cart_items.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
        {cartSelector.cart_items.length === 0 && (
          <div className="no-cart-items-wrapper">
            <div className="no-cart-items">Your cart is empty</div>
          </div>
        )}
      </div>
    </div>
  );
}
