import React from "react";
import "./Overlay.scss";
import { useDispatch, useSelector } from "react-redux";
import { makeSelect_Cart_cartClass } from "../../redux/cart/selectors";
import { closeCart } from "../../utils";

export default function Overlay() {
  const dispatch = useDispatch();
  const cartClassSelector = useSelector(makeSelect_Cart_cartClass);

  const handleClick = () => {
    dispatch(closeCart(cartClassSelector));
  };

  return (
    <div
      onClick={() => handleClick()}
      className={`overlay ${cartClassSelector.cart_class}`}
    ></div>
  );
}
