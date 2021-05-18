import React from "react";

export default function PriceBar({ productSelector }) {
  return (
    <div className="large-price-bar">
      LARGE PRICE - $
      {productSelector.product &&
        productSelector.product.product &&
        productSelector.product.product.unit_price &&
        `${
          productSelector.product.product.unit_price
            ? productSelector.product.product.unit_price
            : "no data"
        }`}
    </div>
  );
}
