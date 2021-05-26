import React from "react";
import "./PaymentRow.scss";

export default function PaymentRow({ item }) {
    console.log("item", item)
    return (
        <div className="payment-row">
            <div className="payment-row-cell name col-4">{item.product.name}</div>
            <div className="payment-row-cell category col-2">{item.product.category.name.toLowerCase()}</div>
            <div className="payment-row-cell quantity col-2">{item.quantity}
                {item.product.unit}</div>
            <div className="payment-row-cell price col-2"> ${item.price}/{item.product.unit}</div>
            <div className="payment-row-cell total-price col-2">${(item.quantity * item.price).toFixed(2)}</div>
        </div>
    );
}
