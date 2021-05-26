import React from "react";
import "./PurchaseRow.scss";

export default function PurchaseRow({ item }) {
  return (
    <tr className="purchase-row">
      <td className="payment-row-cell name col-4">{item.product.name}</td>
      <td className="payment-row-cell category col-2">
        {item.product.category.name.toLowerCase()}
      </td>
      <td className="payment-row-cell quantity col-2">
        {item.quantity}
        {item.product.unit}
      </td>
      <td className="payment-row-cell price col-2">
        ${item.price}/{item.product.unit}
      </td>
      <td className="payment-row-cell total-price col-2">
        ${(item.quantity * item.price).toFixed(2)}
      </td>
    </tr>
  );
}
