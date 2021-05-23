import React from "react";
import "./PriceBar.scss";

export default function PriceBar({ productSelector }) {
  return (
    <div className="large-price-bar">
      <span className="only-for">ONLY FOR</span> <span className="dollar-sign">$</span>
      {productSelector.product &&
        productSelector.product.product &&
        productSelector.product.product.unit_price &&
        <>
          <span className="unit-price">{productSelector.product.product.unit_price}</span><span className="slash">/</span>
          <span className="unit">{productSelector.product.product.unit}</span>
        </>}
    </div>
  );
}
