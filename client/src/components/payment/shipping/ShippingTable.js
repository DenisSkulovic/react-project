import React, { useState } from "react";
import "./ShippingTable.scss";
import ShippingRow from "./ShippingRow";

export default function ShippingTable({ purchase }) {
  const [names, setNames] = useState([
    "full_name",
    "country",
    "address",
    "city",
    "state",
    "zip_code",
    "phone",
    "email",
    "created_date",
  ]);
  const [readableNames, setReadableNames] = useState([
    "Full Name",
    "Country",
    "Address",
    "City",
    "State",
    "ZIP Code",
    "Phone",
    "Email",
    "Purchased",
  ]);
  return (
    <div className="shipping-table-wrapper">
      <table>
        <tbody>
          {purchase &&
            names.map((name, i) => {
              return (
                <ShippingRow
                  key={i}
                  purchase={purchase}
                  name={name}
                  readableName={readableNames[i]}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
