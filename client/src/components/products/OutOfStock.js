import React from "react";
import "./OutOfStock.scss";

export default function OutOfStock({ backgroundColor, textColor, message }) {
  return (
    <div
      className="out-of-stock-container"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="out-of-stock-wrapper">
        <div className="out-of-stock" style={{ textColor: textColor }}>
          <span>{message[0]}</span>
          <br />
          <span>{message[1]}</span>
        </div>
      </div>
    </div>
  );
}
