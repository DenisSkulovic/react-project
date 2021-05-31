import React, { useState, useEffect } from "react";
import CartList from "./CartList";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import Bubble from "./Bubble";
import "./Cart.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  setCartClass,
  setCartBubbleClass,
} from "../../redux/cart/actions";
import {
  makeSelect_Cart_cartClass,
  makeSelect_Cart_cartBubbleClass,
} from "../../redux/cart/selectors";
import { closeCart } from "../../utils";


export default function Cart() {
  const dispatch = useDispatch();
  const cartClassSelector = useSelector(makeSelect_Cart_cartClass);

  const handleClick = () => {
    dispatch(closeCart(cartClassSelector));
  };

  return (
    <div className="cart-container">
      <Bubble />
      <div className={`cart-wrapper ${cartClassSelector.cart_class}`}>
        <div id="mdiv-cart" className="cls-cart" onClick={() => handleClick()}>
          <div className="close-wrapper-cart">
            <div className="mdiv-cart">
              <div className="md-cart"></div>
            </div>
          </div>
        </div>
        <div className="cart">
          <TopNav />
          <CartList />
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
