import React, { useState } from "react";
import AddRemoveButtons from "./AddRemoveButtons";
import "./AllProductsItem.scss";
import {
  getProductToDisplay,
  openProductDetail,
} from "../../../redux/productDetail/actions";
import { setQuantityInputValue } from "../../../redux/productDetail/actions";

// redux
import { useDispatch } from "react-redux";

export default function AllProductsItem({
  id,
  category,
  image,
  name,
  unit_price,
  unit,
}) {
  const dispatch = useDispatch();

  const handleDetailBtnClick = (product_id) => {
    dispatch(setQuantityInputValue(0));
    dispatch(openProductDetail());
    dispatch(getProductToDisplay(product_id));
  };

  return (
    <div
      className={`all-products-item`}
      onClick={() => {
        handleDetailBtnClick(id);
      }}
    >
      <div className="image-wrapper">
        <img src={image} alt={name.toLowerCase().replace(/ /g, "")} />
      </div>
      <div className="details">
        <div className="category">{category.name}</div>
        <div className="title">{name}</div>
        <div className="price">
          <span className="unit-price">${unit_price}</span> /{" "}
          <span className="unit">{unit}</span>
        </div>
      </div>
      <AddRemoveButtons id={id} handleDetailBtnClick={handleDetailBtnClick} />
    </div>
  );
}

// make quantity available wrap to something like "more than 10..." if its more than ten; show number if less;
