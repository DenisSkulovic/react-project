import "./PaymentDetail.scss";
import DownloadBtn from "../pdf/DownloadBtn";
import ContactRow from "./ContactRow";
import PaymentRow from "./PaymentRow";

import React, { useState } from "react";

export default function PaymentDetail({ payment }) {
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
    "Date",
  ]);
  console.log("payment", payment);
  return (
    <div className="payment-detail d-flex flex-row justify-content-around">

      <div className="purchase-items left-col col-7">
        <h4>Purchase Items</h4>
        <div className="columns d-flex flex-row">
          <div className="name col-4">Product</div>
          <div className="category col-2">Category</div>
          <div className="quantity col-2">Quantity</div>
          <div className="unit-price col-2">Unit Price</div>
          <div className="total col-2">Total</div>
        </div>
        <div className="payment-rows">
          {payment.purchase_items &&
            payment.purchase_items.map((item, i) => {
              return <PaymentRow key={i} item={item} />;
            })}
        </div>
        <div className="total-wrapper d-flex flex-row">
          <div className="total-span-str col-10">TOTAL:</div>{" "}
          <div className="total-span-num col-2">
            ${payment.purchase.total_paid.toFixed(2)}
          </div>
        </div>
        <DownloadBtn />
      </div>

      <div className="payment-details-box-wrapper right-col col-4">
        <div className="payment-details-box">
          <h4>Contact Details</h4>
          <div className="payment-detail-rows">
            {payment.purchase &&
              names.map((name, i) => {
                return (
                  <ContactRow
                    key={i}
                    purchase={payment.purchase}
                    name={name}
                    readableName={readableNames[i]}
                  />
                );
              })}
          </div>
        </div>
      </div>

    </div>
  );
}
