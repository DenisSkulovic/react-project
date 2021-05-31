import React from "react";
import "./ClearBtn.scss";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cart/actions";

export default function ClearBtn() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(clearCart());
  };
  return (
    <div className="clear-cart-btn" onClick={() => handleClick()}>
      clear
    </div>
  );
}
