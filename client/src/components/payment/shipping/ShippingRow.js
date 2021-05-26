import React from "react";
import "./ShippingRow.scss";

export default function ShippingRow({ name, purchase, readableName }) {
  return (
    <tr className={`contact-row ${name}`}>
      <td>{readableName}:</td>
      <td>{purchase[name] ? purchase[name] : "Not specified"}</td>
    </tr>
  );
}
