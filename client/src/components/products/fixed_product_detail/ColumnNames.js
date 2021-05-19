import React from "react";

export default function ColumnNames() {
  return (
    <ul className="column-names list-group list-group-horizontal">
      <li className="column-name list-group-item col-3">Product</li>
      <li className="column-name list-group-item col-2">Details</li>
      <li className="column-name list-group-item col-3">Quantity</li>
      <li className="column-name list-group-item col-2">Unit Price</li>
      <li className="column-name list-group-item col-2">Total Price</li>
    </ul>
  );
}
