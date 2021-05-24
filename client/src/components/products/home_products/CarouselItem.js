import React, { useState } from "react";
import "./CarouselItem.scss";
import {
  getProductToDisplay,
  openProductDetail,
} from "../../../redux/productDetail/actions";
import { setQuantityInputValue } from "../../../redux/productDetail/actions";
import AddRemoveButtons from "./AddRemoveButtons";
import OutOfStock from "../OutOfStock";

// redux
import { useDispatch } from "react-redux";

export default function CarouselItem({
  id,
  image,
  name,
  unit,
  unit_price,
  category,
}) {
  const dispatch = useDispatch();

  const handleDetailBtnClick = (product_id) => {
    dispatch(setQuantityInputValue(0));
    dispatch(openProductDetail());
    dispatch(getProductToDisplay(product_id));
  };

  return (
    <div
      className="carousel-item"
      onClick={() => {
        handleDetailBtnClick(id);
      }}
    >
      <OutOfStock />
      <div className="image-wrapper">
        <div className="image-div">
          <img src={image} alt={name.toLowerCase().replace(/ /g, "")} />
        </div>
      </div>
      <div className="details">
        <div className="title">{name}</div>
        <div className="price">
          <span className="unit-price">${unit_price}</span> /{" "}
          <span className="unit">{unit}</span>
        </div>
      </div>
      <AddRemoveButtons id={id} />
    </div>
  );
}
