import React from "react";
import Overlay from "./Overlay";
import DetailItem from "./DetailItem";
import CloseBtn from "./CloseBtn";
import ColumnNames from "./ColumnNames";
import PriceBar from "./PriceBar";
import BottomBar from "./BottomBar";
import "./ProductDetailFixedOverlay.scss";
import { useSelector, useDispatch } from "react-redux";

import {
  makeSelect_ProductDetail_open,
  makeSelect_ProductDetail_product,
} from "../../../redux/productDetail/selectors";
import { addRemoveCartItem } from "../../../redux/cart/actions";
import { closeProductDetail } from "../../../redux/productDetail/actions";

import { makeSelect_ProductDetail_quantityInputValue } from "../../../redux/productDetail/selectors";

export default function ProductDetailFixedOverlay() {
  const dispatch = useDispatch();

  const openSelector = useSelector(makeSelect_ProductDetail_open);
  const productSelector = useSelector(makeSelect_ProductDetail_product);
  const quantityInputValue_Selector = useSelector(
    makeSelect_ProductDetail_quantityInputValue
  );

  const handleAddClick = () => {
    dispatch(
      addRemoveCartItem(
        productSelector.product.product.id,
        quantityInputValue_Selector.quantity_input_value
      )
    );
    dispatch(closeProductDetail());
  };

  return (
    <div className="product-detail-container">
      <Overlay />
      <div
        className={`product-detail-wrapper ${
          openSelector.open ? "visible" : "hidden"
        }`}
      >
        <div className="product-detail-box">
          <div className="top-bar">
            <CloseBtn />
          </div>
          <div className="main-section">
            <PriceBar productSelector={productSelector} />
            <ColumnNames />
            <DetailItem {...productSelector.product} />
          </div>
          <BottomBar handleAddClick={handleAddClick} />
        </div>
      </div>
    </div>
  );
}
