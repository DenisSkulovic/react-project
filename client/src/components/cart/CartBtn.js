import React, { useState, useEffect } from "react";
import "./CartBtn.scss";
import { useSelector, useDispatch } from "react-redux";
import { setCartClass, setCartBubbleClass } from "../../redux/cart/actions";
import {
  makeSelect_Cart_cartClass,
  makeSelect_Cart_cartBubbleClass,
} from "../../redux/cart/selectors";
import { openCart } from "../../utils";
import Overlay from "./Overlay";

export default function CartBtn() {
  const dispatch = useDispatch();
  const cartBubbleClassSelector = useSelector(makeSelect_Cart_cartBubbleClass);

  const handleClick = () => {
    dispatch(openCart(cartBubbleClassSelector));
  };

  return (
    <>
      <Overlay />
      <div className={`cart-btn-wrapper`} onClick={() => handleClick()}>
        <div
          className={`cart-btn ${cartBubbleClassSelector.cart_bubble_class}`}
        >
          <img
            src="https://www.pngitem.com/pimgs/m/480-4803616_amazon-shopping-cart-icon-quotes-of-the-day.png"
            alt="cart-img"
          />
        </div>
      </div>
    </>
  );
}
