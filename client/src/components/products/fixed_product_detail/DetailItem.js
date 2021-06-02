import React from "react";
import "./DetailItem.scss";
import AddRemoveDiv from "./AddRemoveDiv";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setQuantityInputValue } from "../../../redux/productDetail/actions";
import { makeSelect_ProductDetail_quantityInputValue } from "../../../redux/productDetail/selectors";

export default function DetailItem({ product, stock_item }) {
  const dispatch = useDispatch();

  const quantityInputValue_Selector = useSelector(
    makeSelect_ProductDetail_quantityInputValue
  );

  const handleAddRemoveBtnClick = (q) => {
    const currentVal = parseInt(
      quantityInputValue_Selector.quantity_input_value
    );
    q = parseInt(q);
    const final_val =
      currentVal + q > stock_item.quantity
        ? stock_item.quantity
        : currentVal + q;
    dispatch(setQuantityInputValue(final_val));
  };

  const handleInput = (e) => {
    const final_val =
      e.target.value > stock_item.quantity
        ? stock_item.quantity
        : e.target.value;
    dispatch(setQuantityInputValue(final_val));
  };

  return (
    <div className="product-detail-info">
      <div className="image-wrapper col-3">
        <div className="image-div">
          <img
            src={product ? product.image : "no data"}
            alt={product ? product.name : "no data"}
          />
        </div>
      </div>
      <div className="name col-2">{product ? product.name : "no data"}</div>
      <div className="quantity col-3">
        <AddRemoveDiv
          handleAddRemoveBtnClick={handleAddRemoveBtnClick}
          handleInput={handleInput}
          quantityInputValue_Selector={quantityInputValue_Selector}
        />
        <div className="available">
          <div>Available:</div>
          <div>{stock_item ? stock_item.quantity : "no data"}</div>
        </div>
      </div>
      <div className="unit-price col-2">
        <div>{product ? `$${product.unit_price}` : "no data"}</div>
        <div> / {product ? product.unit : "no data"}</div>
      </div>
      <div className="total-price col-2">
        $
        {product &&
          (
            quantityInputValue_Selector.quantity_input_value *
            product.unit_price
          ).toFixed(2)}
      </div>
    </div>
  );
}
