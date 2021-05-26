import React from "react";
import "./PurchaseTable.scss";
import PurchaseRow from "./PurchaseRow";

export default function PurchaseTable({ total_paid, purchase_items }) {
  return (
    <div className="purchase-table-wrapper">
      <table>
        <tr className="purchase-row columns d-flex flex-row">
          <th className="name col-4">Product</th>
          <th className="category col-2">Category</th>
          <th className="quantity col-2">Quantity</th>
          <th className="unit-price col-2">Unit Price</th>
          <th className="total col-2">Total</th>
        </tr>
        {purchase_items &&
          purchase_items.map((item, i) => {
            return <PurchaseRow key={i} item={item} />;
          })}
        {total_paid && (
          <tr className="purchase-row total">
            <td className="total-span-str col-10">TOTAL:</td>
            <td className="total-span-num col-2">${total_paid.toFixed(2)}</td>
          </tr>
        )}
      </table>
    </div>
  );
}
