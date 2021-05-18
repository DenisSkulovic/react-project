import React, { useState } from "react";
import AddRemoveButtons from "./AddRemoveButtons";
import "./AllProductsItem.scss";
import {
  getProductToDisplay,
  openProductDetail,
} from "../../../redux/productDetail/actions";

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
  const [hoverBool, setHoverBool] = useState(false);

  const dispatch = useDispatch();

  const handleDetailBtnClick = (product_id) => {
    dispatch(openProductDetail());
    dispatch(getProductToDisplay(product_id));
  };

  const handleMouseEnter = () => {
    setHoverBool(true);
  };

  const handleMouseLeave = () => {
    setHoverBool(false);
  };

  return (
    <div
      className={`all-products-item ${hoverBool ? "hover" : ""}`}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      <div
        className="image-wrapper"
        onClick={() => {
          handleDetailBtnClick(id);
        }}
      >
        <img src={image} alt={name.toLowerCase().replace(/ /g, "")} />
      </div>
      <div className="details">
        <div className="title">{name}</div>
        <div className="price">
          <span>${unit_price}</span> / <span>{unit}</span>
        </div>
      </div>
      {hoverBool && (
        <AddRemoveButtons id={id} handleDetailBtnClick={handleDetailBtnClick} />
      )}
    </div>
  );
}

// make quantity available wrap to something like "more than 10..." if its more than ten; show number if less;
