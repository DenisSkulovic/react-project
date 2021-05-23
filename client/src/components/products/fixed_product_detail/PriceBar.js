import React from "react";
import "./PriceBar.scss";

export default function PriceBar({ productSelector }) {
  return (
    <div className="large-price-bar">
      ONLY FOR $
      {productSelector.product &&
        productSelector.product.product &&
        productSelector.product.product.unit_price &&
        `${
          productSelector.product.product.unit_price
            ? `${(<span>productSelector.product.product.unit_price</span>)}` /
              `${(<span>productSelector.product.product.unit</span>)}`
            : "no data"
        }`}
    </div>
  );
}
