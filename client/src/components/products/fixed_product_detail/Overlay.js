import React from "react";
import "./Overlay.scss";
import { useDispatch, useSelector } from "react-redux";
import { closeProductDetail } from "../../../redux/productDetail/actions";

import { makeSelect_ProductDetail_open } from "../../../redux/productDetail/selectors";

export default function Overlay() {
  const dispatch = useDispatch();
  const openSelector = useSelector(makeSelect_ProductDetail_open);

  const handleClick = () => {
    dispatch(closeProductDetail());
  };

  return (
    <div
      onClick={() => handleClick()}
      className={`overlay ${openSelector.open ? "visible" : "hidden"}`}
    ></div>
  );
}
