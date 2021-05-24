import React, { useState, useEffect } from "react";
import AddRemoveButtons from "./AddRemoveButtons";
import "./AllProductsItem.scss";
import {
  getProductToDisplay,
  openProductDetail,
} from "../../../redux/productDetail/actions";
import { setQuantityInputValue } from "../../../redux/productDetail/actions";
import OutOfStock from "../OutOfStock";

// redux
import { useDispatch } from "react-redux";

export default function AllProductsItem({
  id,
  category,
  image,
  name,
  unit_price,
  unit,
  stock_item,
}) {
  const dispatch = useDispatch();

  const handleDetailBtnClick = (product_id) => {
    dispatch(setQuantityInputValue(0));
    dispatch(openProductDetail());
    dispatch(getProductToDisplay(product_id));
  };

  const [quantity, setQuantity] = useState(1000);

  useEffect(() => {
    setQuantity(stock_item.quantity);
  }, []);

  return (
    <div
      className={`all-products-item`}
      onClick={() => {
        handleDetailBtnClick(id);
      }}
    >
      {quantity === 0 && (
        <OutOfStock
          backgroundColor={"red"}
          textColor={"white"}
          message={["OUT OF", "STOCK"]}
        />
      )}
      {quantity < 100 && quantity > 0 && (
        <OutOfStock
          backgroundColor={"orange"}
          textColor={"white"}
          message={["ALMOST", "SOLD OUT"]}
        />
      )}
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
