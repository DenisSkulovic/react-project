import "./PaymentDetail.scss";

import React from "react";

export default function PaymentDetail({ payment }) {
  console.log(payment.purchase_items);
  return (
    <div className="payment-details">
      <div className="payment-details-box">
        <h4>Payment Detail</h4>
        <p className="name">
          <span>Full Name:</span>{" "}
          <span>
            {payment.purchase.full_name
              ? payment.purchase.full_name
              : "Not specified"}
          </span>
        </p>
        <p className="country">
          Country:{" "}
          {payment.purchase.country
            ? payment.purchase.country
            : "Not specified"}
        </p>
        <p className="address">
          Address:{" "}
          {payment.purchase.address
            ? payment.purchase.address
            : "Not specified"}
        </p>
        <p className="city">
          City:{" "}
          {payment.purchase.city ? payment.purchase.city : "Not specified"}
        </p>
        <p className="state">
          State:{" "}
          {payment.purchase.state ? payment.purchase.state : "Not specified"}
        </p>
        <p className="zip_code">
          ZIP Code:{" "}
          {payment.purchase.zip_code
            ? payment.purchase.zip_code
            : "Not specified"}
        </p>
        <p className="phone">
          Phode:{" "}
          {payment.purchase.phone ? payment.purchase.phone : "Not specified"}
        </p>
        <p className="email">
          Email:{" "}
          {payment.purchase.email ? payment.purchase.email : "Not specified"}
        </p>
        <p className="date">
          Payment Date:{" "}
          {payment.purchase.created_date
            ? payment.purchase.created_date
            : "Not specified"}
        </p>
      </div>
      <div className="purchase-items">
        <h4>Purchase Items</h4>
        {payment.purchase_items &&
          payment.purchase_items.map((item) => {
            return (
              <p className="purchase-item">
                <span className="name">{item.product.name}</span> {"("}
                <span className="category">
                  {item.product.category.name.toLowerCase()}
                </span>
                {")"} -{" "}
                <span className="quantity">
                  {item.quantity}
                  {item.product.unit}
                </span>{" "}
                -{" "}
                <span className="price">
                  ${item.price}/{item.product.unit}
                </span>{" "}
                -{" "}
                <span className="total-price">
                  ${(item.quantity * item.price).toFixed(2)}
                </span>
              </p>
            );
          })}
        <p className="total">
          TOTAL: ${payment.purchase.total_paid.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
